from rest_framework import serializers

from .models import Album, Track
from apps.store.models import Product


class TrackSerializer(serializers.ModelSerializer):
    audio_file = serializers.SerializerMethodField()

    class Meta:
        model = Track

        fields = [
            "id",
            "title",
            "track_number",
            "duration",
            "audio_file",
            "is_published",
        ]

    def get_audio_file(self, obj):
        request = self.context.get("request")

        if not obj.audio_file:
            return None

        url = obj.audio_file.url

        if request:
            return request.build_absolute_uri(url)

        return url


class AlbumProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product

        fields = [
            "id",
            "name",
            "slug",
            "product_type",
            "description",
            "thumbnail",
            "price",
            "stock_quantity",
            "is_active",
            "featured",
        ]


class AlbumSerializer(serializers.ModelSerializer):
    tracks = serializers.SerializerMethodField()
    products = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Album

        fields = [
            "id",
            "title",
            "slug",
            "cover_image",
            "description",
            "release_date",
            "spotify_url",
            "apple_music_url",
            "audiomack_url",
            "youtube_url",
            "boomplay_url",
            "is_featured",
            "is_published",
            "created_at",
            "tracks",
            "products",
        ]

    def get_cover_image(self, obj):
        request = self.context.get("request")

        if not obj.cover_image:
            return None

        url = obj.cover_image.url

        if request:
            return request.build_absolute_uri(url)

        return url

    def get_tracks(self, obj):
        tracks = obj.tracks.filter(
            is_published=True
        )

        return TrackSerializer(
            tracks,
            many=True,
            context=self.context,
        ).data

    def get_products(self, obj):
        products = obj.products.filter(
            is_active=True
        )

        return AlbumProductSerializer(
            products,
            many=True,
            context=self.context,
        ).data