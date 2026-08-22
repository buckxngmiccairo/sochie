from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    ProductViewSet,
    CartViewSet,
    OrderViewSet,
    CreateCartAPIView,
    GetCartAPIView,
    AddCartItemAPIView,
    UpdateCartItemAPIView,
    RemoveCartItemAPIView,
    ClearCartAPIView,
    CheckoutAPIView,
    VerifyPaymentAPIView,
)

router = DefaultRouter()

router.register(
    r"categories",
    CategoryViewSet,
    basename="category",
)

router.register(
    r"products",
    ProductViewSet,
    basename="product",
)

router.register(
    r"carts",
    CartViewSet,
    basename="cart",
)

router.register(
    r"orders",
    OrderViewSet,
    basename="order",
)

urlpatterns = [

    # ==========================
    # CART
    # ==========================

    # Create Cart
    path(
        "cart/",
        CreateCartAPIView.as_view(),
        name="create-cart",
    ),

    # Add Item
    path(
        "cart/add-item/",
        AddCartItemAPIView.as_view(),
        name="add-cart-item",
    ),

    # Update Item
    path(
        "cart/update-item/",
        UpdateCartItemAPIView.as_view(),
        name="update-cart-item",
    ),

    # Remove Item
    path(
        "cart/remove-item/",
        RemoveCartItemAPIView.as_view(),
        name="remove-cart-item",
    ),

    # Clear Cart
    path(
        "cart/clear/<str:session_key>/",
        ClearCartAPIView.as_view(),
        name="clear-cart",
    ),

    # IMPORTANT:
    # Keep this LAST so it doesn't match
    # "add-item", "update-item", etc.
    path(
        "cart/<str:session_key>/",
        GetCartAPIView.as_view(),
        name="get-cart",
    ),

    # ==========================
    # CHECKOUT
    # ==========================

    path(
        "checkout/",
        CheckoutAPIView.as_view(),
        name="checkout",
    ),

    # ==========================
    # PAYMENT
    # ==========================

    path(
        "payments/verify/<str:reference>/",
        VerifyPaymentAPIView.as_view(),
        name="verify-payment",
    ),

] + router.urls