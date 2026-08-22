from rest_framework import generics

from .models import Tour
from .serializers import TourSerializer


class TourListView(generics.ListAPIView):
    queryset = Tour.objects.filter(is_active=True)
    serializer_class = TourSerializer


class TourDetailView(generics.RetrieveAPIView):
    queryset = Tour.objects.filter(is_active=True)
    serializer_class = TourSerializer
    lookup_field = "id"