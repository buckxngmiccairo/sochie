from rest_framework import generics
from .models import Song
from .serializers import SongSerializer


class SongListView(generics.ListAPIView):
    queryset = Song.objects.filter(is_published=True)
    serializer_class = SongSerializer


class SongDetailView(generics.RetrieveAPIView):
    queryset = Song.objects.filter(is_published=True)
    serializer_class = SongSerializer
    lookup_field = "slug"