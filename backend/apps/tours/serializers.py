from rest_framework import serializers
from .models import Tour, TourStop


class TourStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourStop
        fields = "__all__"


class TourSerializer(serializers.ModelSerializer):
    stops = TourStopSerializer(many=True, read_only=True)

    class Meta:
        model = Tour
        fields = "__all__"