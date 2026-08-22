from django.contrib import admin

from .models import Album, Track


class TrackInline(admin.TabularInline):
    model = Track
    extra = 1
    fields = (
        "track_number",
        "title",
        "duration",
        "audio_file",
        "is_published",
    )
    ordering = ("track_number",)


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "release_date",
        "is_featured",
        "is_published",
        "created_at",
    )

    list_filter = (
        "is_featured",
        "is_published",
        "release_date",
    )

    search_fields = (
        "title",
        "description",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    readonly_fields = (
        "created_at",
    )

    inlines = [
        TrackInline,
    ]


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "album",
        "track_number",
        "duration",
        "is_published",
    )

    list_filter = (
        "album",
        "is_published",
    )

    search_fields = (
        "title",
        "album__title",
    )

    ordering = (
        "album",
        "track_number",
    )