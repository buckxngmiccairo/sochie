from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    PRODUCT_TYPE_CHOICES = (
        ("physical", "Physical"),
        ("digital", "Digital"),
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    product_type = models.CharField(
        max_length=20,
        choices=PRODUCT_TYPE_CHOICES,
        default="physical",
    )

    description = models.TextField(blank=True)

    thumbnail = models.ImageField(
        upload_to="products/thumbnails/",
        blank=True,
        null=True,
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock_quantity = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    featured = models.BooleanField(
    default=False
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(upload_to="products/")
    alt_text = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.product.name


class Order(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("processing", "Processing"),
        ("shipped", "Shipped"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
        ("failed", "Failed"),
        ("refunded", "Refunded"),
    )

    ORDER_TYPE_CHOICES = (
        ("digital", "Digital"),
        ("physical", "Physical"),
        ("mixed", "Mixed"),
    )

    PAYMENT_METHOD_CHOICES = (
        ("paystack", "Paystack"),
        ("stripe", "Stripe"),
        ("bank_transfer", "Bank Transfer"),
        ("cash", "Cash"),
    )

    # NEW: Link Order back to the Cart that created it
    cart = models.ForeignKey(
        "Cart",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="orders",
    )

    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)

    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    address = models.TextField(blank=True)

    order_type = models.CharField(
        max_length=20,
        choices=ORDER_TYPE_CHOICES,
        default="digital",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    payment_method = models.CharField(
        max_length=30,
        choices=PAYMENT_METHOD_CHOICES,
        default="paystack",
    )

    payment_reference = models.CharField(
        max_length=255,
        unique=True,
        null=True,
        blank=True,
    )

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    notes = models.TextField(blank=True)

    # NEW
    paid_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(default=1)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


class Cart(models.Model):
    session_key = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.session_key


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"