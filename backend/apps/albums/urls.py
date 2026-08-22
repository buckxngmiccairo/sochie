from django.urls import path

from .views import (
    AlbumListView,
    AlbumDetailView,
)

urlpatterns = [
    path(
        "",
        AlbumListView.as_view(),
        name="album-list",
    ),

    path(
        "<slug:slug>/",
        AlbumDetailView.as_view(),
        name="album-detail",
    ),
]