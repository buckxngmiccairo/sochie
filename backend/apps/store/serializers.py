from rest_framework import serializers

from .models import (
    Category,
    Product,
    ProductImage,
    Cart,
    CartItem,
    Order,
    OrderItem,
)


# ======================================
# PRODUCT SERIALIZERS
# ======================================

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = (
            "id",
            "image",
            "alt_text",
        )


class ProductSerializer(serializers.ModelSerializer):

    images = ProductImageSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Product
        fields = "__all__"


# ======================================
# CART SERIALIZERS
# ======================================

class CartItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(
        read_only=True
    )

    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = (
            "id",
            "product",
            "quantity",
            "subtotal",
        )

    def get_subtotal(self, obj):
        return obj.product.price * obj.quantity


class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(
        many=True,
        read_only=True,
    )

    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = (
            "id",
            "session_key",
            "items",
            "total",
            "created_at",
        )

    def get_total(self, obj):

        total = 0

        for item in obj.items.select_related(
            "product"
        ):
            total += (
                item.product.price
                * item.quantity
            )

        return total


class CreateCartSerializer(serializers.Serializer):

    session_key = serializers.CharField(
        max_length=255
    )

    def validate_session_key(
        self,
        value,
    ):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Session key cannot be empty."
            )

        return value


class AddCartItemSerializer(serializers.Serializer):

    session_key = serializers.CharField(
        max_length=255
    )

    product_id = serializers.IntegerField()

    quantity = serializers.IntegerField(
        min_value=1
    )


class UpdateCartItemSerializer(serializers.Serializer):

    item_id = serializers.IntegerField()

    quantity = serializers.IntegerField(
        min_value=0
    )


class RemoveCartItemSerializer(serializers.Serializer):

    item_id = serializers.IntegerField()


# ======================================
# ORDER SERIALIZERS
# ======================================

# ======================================
# ORDER SERIALIZERS
# ======================================

class OrderItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Order
        fields = "__all__"


# ======================================
# CHECKOUT SERIALIZER
# ======================================

class CheckoutSerializer(serializers.Serializer):

    session_key = serializers.CharField(
        max_length=255
    )

    customer_name = serializers.CharField(
        max_length=255
    )

    customer_email = serializers.EmailField()

    customer_phone = serializers.CharField(
        max_length=20
    )

    country = serializers.CharField(
        max_length=100
    )

    state = serializers.CharField(
        max_length=100
    )

    city = serializers.CharField(
        max_length=100
    )

    address = serializers.CharField(
        required=False,
        allow_blank=True,
    )

    notes = serializers.CharField(
        required=False,
        allow_blank=True,
    )

    def validate_session_key(
        self,
        value,
    ):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Session key is required."
            )

        return value

    def validate_customer_name(
        self,
        value,
    ):
        value = value.strip()

        if len(value) < 2:
            raise serializers.ValidationError(
                "Customer name is too short."
            )

        return value

    def validate_customer_phone(
        self,
        value,
    ):
        value = value.strip()

        if len(value) < 7:
            raise serializers.ValidationError(
                "Enter a valid phone number."
            )

        return value