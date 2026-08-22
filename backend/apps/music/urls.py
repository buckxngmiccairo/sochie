from django.urls import path
from .views import SongListView, SongDetailView

urlpatterns = [
    path("", SongListView.as_view(), name="song-list"),
    path("<slug:slug>/", SongDetailView.as_view(), name="song-detail"),
]