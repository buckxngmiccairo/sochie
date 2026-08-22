from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Category,
    Product,
    Cart,
    Order,
)

from .serializers import (
    CategorySerializer,
    ProductSerializer,
    CartSerializer,
    OrderSerializer,
    CheckoutSerializer,
    CreateCartSerializer,
    AddCartItemSerializer,
    UpdateCartItemSerializer,
    RemoveCartItemSerializer,
)

from .services import (
    CartService,
    CheckoutService,
)


# ======================================
# PRODUCT APIs
# ======================================

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):

    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Product.objects.filter(
            is_active=True
        ).order_by(
            "-featured",
            "-created_at",
        )

        category_slug = self.request.query_params.get(
            "category"
        )

        if category_slug:
            queryset = queryset.filter(
                category__slug=category_slug
            )

        return queryset


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = OrderSerializer


# ======================================
# CART APIs
# ======================================

class CreateCartAPIView(APIView):

    def post(self, request):

        serializer = CreateCartSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        cart = CartService.get_or_create_cart(
            serializer.validated_data["session_key"]
        )

        return Response(
            CartSerializer(cart).data,
            status=status.HTTP_200_OK,
        )


class GetCartAPIView(APIView):

    def get(self, request, session_key):

        cart_data = CartService.get_cart(
            session_key
        )

        return Response(
            CartSerializer(
                cart_data["cart"]
            ).data,
            status=status.HTTP_200_OK,
        )


class AddCartItemAPIView(APIView):

    def post(self, request):

        serializer = AddCartItemSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        try:

            item = CartService.add_item(
                session_key=serializer.validated_data["session_key"],
                product_id=serializer.validated_data["product_id"],
                quantity=serializer.validated_data["quantity"],
            )

            return Response(
                {
                    "message": "Item added to cart.",
                    "item_id": item.id,
                },
                status=status.HTTP_200_OK,
            )

        except ValueError as e:

            return Response(
                {
                    "detail": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class UpdateCartItemAPIView(APIView):

    def patch(self, request):

        serializer = UpdateCartItemSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        try:

            item = CartService.update_quantity(
                item_id=serializer.validated_data["item_id"],
                quantity=serializer.validated_data["quantity"],
            )

            if item is None:

                return Response(
                    {
                        "message": "Item removed."
                    },
                    status=status.HTTP_200_OK,
                )

            return Response(
                {
                    "message": "Quantity updated.",
                    "item_id": item.id,
                    "quantity": item.quantity,
                },
                status=status.HTTP_200_OK,
            )

        except ValueError as e:

            return Response(
                {
                    "detail": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class RemoveCartItemAPIView(APIView):

    def delete(self, request):

        serializer = RemoveCartItemSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        CartService.remove_item(
            serializer.validated_data["item_id"]
        )

        return Response(
            {
                "message": "Item removed successfully."
            },
            status=status.HTTP_200_OK,
        )


class ClearCartAPIView(APIView):

    def delete(self, request, session_key):

        cart = CartService.get_or_create_cart(
            session_key
        )

        CartService.clear_cart(cart)

        return Response(
            {
                "message": "Cart cleared successfully."
            },
            status=status.HTTP_200_OK,
        )


# ======================================
# CHECKOUT APIs
# ======================================

class CheckoutAPIView(APIView):

    def post(self, request):

        serializer = CheckoutSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        cart = CartService.get_or_create_cart(
            serializer.validated_data["session_key"]
        )

        try:

            result = CheckoutService.create_order(
                cart=cart,
                customer_data=serializer.validated_data,
            )

            return Response(
                {
                    "message": "Order created successfully.",
                    "order": OrderSerializer(
                        result["order"]
                    ).data,
                    "payment": result["payment"],
                },
                status=status.HTTP_201_CREATED,
            )

        except ValueError as e:

            return Response(
                {
                    "detail": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class VerifyPaymentAPIView(APIView):

    def get(self, request, reference):

        try:

            result = CheckoutService.complete_payment(
                reference
            )

            return Response(
                {
                    "message": "Payment verified successfully.",
                    "order": OrderSerializer(
                        result["order"]
                    ).data,
                    "payment": result["payment"],
                },
                status=status.HTTP_200_OK,
            )

        except Order.DoesNotExist:

            return Response(
                {
                    "detail": "Order not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        except ValueError as e:

            return Response(
                {
                    "detail": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class CartViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Cart.objects.all().order_by(
        "-created_at"
    )

    serializer_class = CartSerializer