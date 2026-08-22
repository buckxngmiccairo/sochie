from rest_framework import generics

from .models import Album
from .serializers import AlbumSerializer


class AlbumListView(generics.ListAPIView):
    queryset = (
        Album.objects
        .filter(is_published=True)
        .prefetch_related("tracks")
        .order_by("-release_date", "-created_at")
    )

    serializer_class = AlbumSerializer


class AlbumDetailView(generics.RetrieveAPIView):
    queryset = (
        Album.objects
        .filter(is_published=True)
        .prefetch_related("tracks")
    )

    serializer_class = AlbumSerializer

    lookup_field = "slug"