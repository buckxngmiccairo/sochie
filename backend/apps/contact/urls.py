from django.urls import path

from .views import (
    ContactSubmissionAPIView,
    NewsletterSubscribeAPIView,
)


urlpatterns = [
    path(
        "message/",
        ContactSubmissionAPIView.as_view(),
        name="contact-message",
    ),

    path(
        "newsletter/",
        NewsletterSubscribeAPIView.as_view(),
        name="newsletter-subscribe",
    ),
]