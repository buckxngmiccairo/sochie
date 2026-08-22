from django.contrib import admin

from .models import (
    Category,
    Product,
    ProductImage,
    Cart,
    CartItem,
    Order,
    OrderItem,
)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "slug",
    )

    search_fields = (
        "name",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "category",
        "product_type",
        "price",
        "stock_quantity",
        "is_active",
    )

    list_filter = (
        "category",
        "product_type",
        "is_active",
    )

    search_fields = (
        "name",
        "description",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    inlines = [
        ProductImageInline
    ]

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "category",
                    "name",
                    "slug",
                    "product_type",
                    "description",
                )
            },
        ),
        (
            "Media",
            {
                "fields": (
                    "thumbnail",
                )
            },
        ),
        (
            "Pricing & Inventory",
            {
                "fields": (
                    "price",
                    "stock_quantity",
                    "is_active",
                )
            },
        ),
    )


class OrderItemInline(admin.TabularInline):

    model = OrderItem
    extra = 0

    readonly_fields = (
        "product",
        "quantity",
        "price",
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "customer_name",
        "customer_email",
        "customer_phone",
        "order_type",
        "status",
        "payment_method",
        "payment_reference",
        "total_amount",
        "paid_at",
        "created_at",
    )

    list_filter = (
        "status",
        "order_type",
        "payment_method",
    )

    search_fields = (
        "customer_name",
        "customer_email",
        "customer_phone",
        "payment_reference",
    )

    readonly_fields = (
        "payment_reference",
        "paid_at",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Customer Information",
            {
                "fields": (
                    "customer_name",
                    "customer_email",
                    "customer_phone",
                )
            },
        ),
        (
            "Delivery Information",
            {
                "fields": (
                    "country",
                    "state",
                    "city",
                    "address",
                )
            },
        ),
        (
            "Payment",
            {
                "fields": (
                    "payment_method",
                    "payment_reference",
                    "status",
                    "paid_at",
                )
            },
        ),
        (
            "Order",
            {
                "fields": (
                    "order_type",
                    "total_amount",
                    "notes",
                )
            },
        ),
        (
            "System",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    inlines = [
        OrderItemInline
    ]


class CartItemInline(admin.TabularInline):

    model = CartItem
    extra = 0


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "session_key",
        "created_at",
    )

    search_fields = (
        "session_key",
    )

    inlines = [
        CartItemInline
    ]