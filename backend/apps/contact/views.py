from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    ContactSubmission,
    NewsletterSubscriber,
)

from .serializers import (
    ContactSubmissionSerializer,
    NewsletterSubscriberSerializer,
)


class ContactSubmissionAPIView(APIView):

    def post(self, request):

        serializer = ContactSubmissionSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        submission = serializer.save()

        return Response(
            {
                "message": "Your message has been sent successfully.",
                "submission": ContactSubmissionSerializer(
                    submission
                ).data,
            },
            status=status.HTTP_201_CREATED,
        )


class NewsletterSubscribeAPIView(APIView):

    def post(self, request):

        serializer = NewsletterSubscriberSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        email = serializer.validated_data["email"]

        subscriber, created = NewsletterSubscriber.objects.get_or_create(
            email=email
        )

        if not created:
            return Response(
                {
                    "message": "This email is already subscribed."
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "message": "You have successfully joined the journey.",
                "subscriber": NewsletterSubscriberSerializer(
                    subscriber
                ).data,
            },
            status=status.HTTP_201_CREATED,
        )