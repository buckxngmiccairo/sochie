from django.db import models


class Song(models.Model):
    STATUS_CHOICES = [
        ("stream", "Stream Only"),
        ("preorder", "Pre-order"),
        ("sale", "Buy Now"),
        ("free", "Free Download"),
    ]

    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)

    cover_image = models.ImageField(
        upload_to="music/covers/",
        blank=True,
        null=True,
    )

    audio_file = models.FileField(
        upload_to="music/tracks/",
        blank=True,
        null=True,
    )

    preview_file = models.FileField(
        upload_to="music/previews/",
        blank=True,
        null=True,
    )

    genre = models.CharField(max_length=150, blank=True)

    release_date = models.DateField(blank=True, null=True)

    description = models.TextField(blank=True)

    duration = models.DurationField(blank=True, null=True)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    currency = models.CharField(
        max_length=10,
        default="NGN",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="stream",
    )

    allow_download = models.BooleanField(default=False)

    spotify_url = models.URLField(blank=True)
    apple_music_url = models.URLField(blank=True)
    audiomack_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    boomplay_url = models.URLField(blank=True)

    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title