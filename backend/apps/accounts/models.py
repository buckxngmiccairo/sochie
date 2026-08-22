from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    ROLE_CHOICES = [
        ("artist", "Artist"),
        ("manager", "Manager"),
        ("staff", "Staff"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="manager")
    display_name = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to="profiles/", blank=True, null=True)

    instagram = models.URLField(blank=True)
    tiktok = models.URLField(blank=True)
    youtube = models.URLField(blank=True)
    spotify = models.URLField(blank=True)
    website = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.display_name