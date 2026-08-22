from decimal import Decimal
import uuid
import requests

from django.conf import settings
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_datetime

from .models import (
    Cart,
    CartItem,
    Product,
    Order,
    OrderItem,
)


class CartService:
    """
    Handles all shopping cart operations.
    """

    @staticmethod
    def get_or_create_cart(session_key):
        """
        Get the customer's cart.
        Create one if it doesn't exist.
        """

        cart, _ = Cart.objects.get_or_create(
            session_key=session_key
        )

        return cart

    @staticmethod
    def get_cart(session_key):
        """
        Return the customer's cart together
        with all cart items.
        """

        cart = CartService.get_or_create_cart(
            session_key
        )

        items = (
            cart.items
            .select_related("product")
            .order_by("id")
        )

        return {
            "cart": cart,
            "items": items,
            "total": CartService.cart_total(cart),
        }

    @staticmethod
    @transaction.atomic
    def add_item(
        session_key,
        product_id,
        quantity=1,
    ):
        """
        Add a product to the cart.
        """

        cart = CartService.get_or_create_cart(
            session_key
        )

        product = get_object_or_404(
            Product,
            id=product_id,
            is_active=True,
        )

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={
                "quantity": quantity,
            },
        )

        if not created:
            item.quantity += quantity
            item.save(
                update_fields=["quantity"]
            )

        return item

    @staticmethod
    @transaction.atomic
    def update_quantity(
        item_id,
        quantity,
    ):
        """
        Update a cart item's quantity.
        """

        item = get_object_or_404(
            CartItem,
            id=item_id,
        )

        if quantity <= 0:
            item.delete()
            return None

        item.quantity = quantity

        item.save(
            update_fields=["quantity"]
        )

        return item

    @staticmethod
    @transaction.atomic
    def remove_item(item_id):
        """
        Remove an item from the cart.
        """

        item = get_object_or_404(
            CartItem,
            id=item_id,
        )

        item.delete()

    @staticmethod
    @transaction.atomic
    def clear_cart(cart):
        """
        Remove every item from the cart.
        """

        cart.items.all().delete()

    @staticmethod
    def cart_total(cart):
        """
        Calculate the cart total.
        """

        total = Decimal("0.00")

        items = cart.items.select_related(
            "product"
        )

        for item in items:
            total += (
                item.product.price
                * item.quantity
            )

        return total


class PaystackService:
    """
    Handles all Paystack API operations.
    """

    SECRET_KEY = settings.PAYSTACK_SECRET_KEY
    PUBLIC_KEY = settings.PAYSTACK_PUBLIC_KEY

    BASE_URL = "https://api.paystack.co"

    @classmethod
    def initialize_payment(cls, order):
        """
        Initialize a Paystack payment.
        """

        if not cls.SECRET_KEY:
            raise ValueError(
                "PAYSTACK_SECRET_KEY is not configured."
            )

        if not order.payment_reference:
            order.payment_reference = str(uuid.uuid4())
            order.save(
                update_fields=["payment_reference"]
            )

        url = (
            f"{cls.BASE_URL}"
            "/transaction/initialize"
        )

        headers = {
            "Authorization": f"Bearer {cls.SECRET_KEY}",
            "Content-Type": "application/json",
        }

        payload = {
            "email": order.customer_email,
            "amount": int(order.total_amount * 100),
            "currency": "USD",
            "reference": order.payment_reference,
            "metadata": {
                "order_id": order.id,
                "customer_name": order.customer_name,
                "customer_phone": order.customer_phone,
                "order_type": order.order_type,
            },
        }

        try:

            response = requests.post(
                url,
                headers=headers,
                json=payload,
                timeout=30,
            )

            try:
                data = response.json()
            except ValueError:
                data = {
                    "message": response.text
                }

        except requests.RequestException as exc:
            raise ValueError(
                f"Unable to connect to Paystack: {exc}"
            ) from exc

        if response.status_code != 200:
            raise ValueError(
                f"Paystack HTTP {response.status_code}: "
                f"{data.get('message', data)}"
            )

        if not data.get("status"):
            raise ValueError(
                data.get(
                    "message",
                    "Unable to initialize payment.",
                )
            )

        return data["data"]

    @classmethod
    def verify_payment(cls, reference):
        """
        Verify a Paystack payment.
        """

        url = (
            f"{cls.BASE_URL}"
            f"/transaction/verify/{reference}"
        )

        headers = {
            "Authorization": f"Bearer {cls.SECRET_KEY}",
            "Content-Type": "application/json",
        }

        try:

            response = requests.get(
                url,
                headers=headers,
                timeout=30,
            )

            response.raise_for_status()

            data = response.json()

        except requests.HTTPError:

            try:
                error = response.json()
            except Exception:
                error = response.text

            raise ValueError(
                f"Paystack HTTP {response.status_code}: {error}"
            )

        except requests.RequestException as exc:
            raise ValueError(
                "Unable to connect to Paystack."
            ) from exc

        if not data.get("status"):
            raise ValueError(
                data.get(
                    "message",
                    "Payment verification failed.",
                )
            )

        payment = data["data"]

        return {
            "status": payment["status"],
            "reference": payment["reference"],
            "paid_at": payment.get("paid_at"),
            "gateway_response": payment.get(
                "gateway_response"
            ),
            "amount": Decimal(
                str(payment["amount"])
            ) / Decimal("100"),
            "channel": payment.get("channel"),
            "currency": payment.get("currency"),
        }


class CheckoutService:
    """
    Handles the complete checkout process.
    """

    @staticmethod
    @transaction.atomic
    def create_order(cart, customer_data):
        """
        Create a pending order and initialize payment.
        Stock is NOT deducted here.
        """

        items = cart.items.select_related("product")

        if not items.exists():
            raise ValueError("Cart is empty.")

        has_physical = False
        has_digital = False
        total = Decimal("0.00")

        for item in items:

            product = item.product

            if (
                product.product_type == "physical"
                and item.quantity > product.stock_quantity
            ):
                raise ValueError(
                    f"{product.name} is out of stock."
                )

            total += (
                product.price
                * item.quantity
            )

            if product.product_type == "physical":
                has_physical = True
            else:
                has_digital = True

        if has_physical and has_digital:
            order_type = "mixed"
        elif has_physical:
            order_type = "physical"
        else:
            order_type = "digital"

        order = Order.objects.create(
            cart=cart,
            customer_name=customer_data["customer_name"],
            customer_email=customer_data["customer_email"],
            customer_phone=customer_data["customer_phone"],
            country=customer_data["country"],
            state=customer_data["state"],
            city=customer_data["city"],
            address=customer_data.get(
                "address",
                "",
            ),
            notes=customer_data.get(
                "notes",
                "",
            ),
            order_type=order_type,
            total_amount=total,
            status="pending",
        )

        order_items = []

        for item in items:

            order_items.append(
                OrderItem(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price,
                )
            )

        OrderItem.objects.bulk_create(
            order_items
        )

        payment = PaystackService.initialize_payment(
            order
        )

        return {
            "order": order,
            "payment": payment,
        }

    @staticmethod
    @transaction.atomic
    def complete_payment(reference):
        """
        Verify payment, mark order as paid,
        reduce stock and clear the cart.
        """

        payment = PaystackService.verify_payment(
            reference
        )

        order = get_object_or_404(
            Order,
            payment_reference=reference,
        )

        # Prevent duplicate processing
        if order.status == "paid":
            return {
                "order": order,
                "payment": payment,
            }

        if payment["status"] != "success":

            order.status = "failed"

            order.save(
                update_fields=[
                    "status",
                ]
            )

            raise ValueError(
                "Payment was not successful."
            )

        paid_at = payment.get(
            "paid_at"
        )

        order.status = "paid"

        if paid_at:
            order.paid_at = parse_datetime(
                paid_at
            )

        order.save(
            update_fields=[
                "status",
                "paid_at",
            ]
        )

        # Reduce stock only after payment
        for item in order.items.select_related(
            "product"
        ):

            product = item.product

            if product.product_type != "physical":
                continue

            if (
                product.stock_quantity
                < item.quantity
            ):
                raise ValueError(
                    f"{product.name} no longer has enough stock."
                )

            product.stock_quantity -= (
                item.quantity
            )

            product.save(
                update_fields=[
                    "stock_quantity",
                ]
            )

        # Empty the customer's cart
        if order.cart:
            CartService.clear_cart(
                order.cart
            )

        return {
            "order": order,
            "payment": payment,
        }