from django.db import models


class Tour(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    start_date = models.DateField()
    end_date = models.DateField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class TourStop(models.Model):
    tour = models.ForeignKey(
        Tour,
        on_delete=models.CASCADE,
        related_name="stops"
    )

    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    venue = models.CharField(max_length=255)

    show_date = models.DateTimeField()

    ticket_url = models.URLField(blank=True)

    is_sold_out = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.city} - {self.venue}"