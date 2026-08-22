from django.db import models


class Album(models.Model):
    title = models.CharField(
        max_length=150
    )

    slug = models.SlugField(
        unique=True
    )

    cover_image = models.ImageField(
        upload_to="albums/covers/",
        blank=True,
        null=True
    )

    description = models.TextField(
        blank=True
    )

    release_date = models.DateField(
        blank=True,
        null=True
    )

    spotify_url = models.URLField(
        blank=True
    )

    apple_music_url = models.URLField(
        blank=True
    )

    audiomack_url = models.URLField(
        blank=True
    )

    youtube_url = models.URLField(
        blank=True
    )

    boomplay_url = models.URLField(
        blank=True
    )

    is_featured = models.BooleanField(
        default=False
    )

    is_published = models.BooleanField(
        default=True
    )

    products = models.ManyToManyField(
    "store.Product",
    blank=True,
    related_name="albums",
)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


class Track(models.Model):
    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE,
        related_name="tracks"
    )

    title = models.CharField(
        max_length=150
    )

    track_number = models.PositiveIntegerField()

    duration = models.CharField(
        max_length=20,
        blank=True
    )

    audio_file = models.FileField(
        upload_to="albums/tracks/",
        blank=True,
        null=True
    )

    is_published = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["track_number"]

    def __str__(self):
        return f"{self.track_number}. {self.title}"