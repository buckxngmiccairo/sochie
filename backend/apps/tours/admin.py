from django.contrib import admin
from .models import Tour, TourStop


class TourStopInline(admin.TabularInline):
    model = TourStop
    extra = 1


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "start_date",
        "end_date",
        "is_active",
    )

    list_filter = (
        "is_active",
        "start_date",
    )

    search_fields = (
        "title",
    )

    inlines = [TourStopInline]