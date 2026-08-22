from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),

    # Music
    path(
        "api/music/",
        include("apps.music.urls"),
    ),

    # Albums
    path(
        "api/albums/",
        include("apps.albums.urls"),
    ),

    # Tours
    path(
        "api/tours/",
        include("apps.tours.urls"),
    ),

    # Store
    path(
        "api/store/",
        include("apps.store.urls"),
    ),

    # Contact
    path(
        "api/contact/",
        include("apps.contact.urls"),
    ),
]


# ==================================================
# MEDIA FILES
# ==================================================

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )