from django.contrib import admin
from .models import Song


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "status",
        "price",
        "is_featured",
        "is_published",
        "release_date",
    )

    list_filter = (
        "status",
        "genre",
        "is_featured",
        "is_published",
    )

    search_fields = (
        "title",
        "genre",
        "description",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    ordering = ("-created_at",)

    fieldsets = (
        ("Basic Information", {
            "fields": (
                "title",
                "slug",
                "genre",
                "description",
                "release_date",
            )
        }),

        ("Media", {
            "fields": (
                "cover_image",
                "audio_file",
                "preview_file",
            )
        }),

        ("Sales", {
            "fields": (
                "status",
                "price",
                "currency",
                "allow_download",
            )
        }),

        ("Streaming Platforms", {
            "fields": (
                "spotify_url",
                "apple_music_url",
                "audiomack_url",
                "boomplay_url",
                "youtube_url",
            )
        }),

        ("Publishing", {
            "fields": (
                "duration",
                "is_featured",
                "is_published",
            )
        }),
    )