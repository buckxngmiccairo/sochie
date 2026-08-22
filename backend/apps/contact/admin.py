from django.contrib import admin

from .models import (
    ContactSubmission,
    NewsletterSubscriber,
)


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "subject",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "subject",
    )


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "subscribed_at",
    )

    search_fields = (
        "email",
    )