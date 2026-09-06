from django.db import migrations
from django.contrib.auth.hashers import make_password


def create_manager_admin(apps, schema_editor):
    User = apps.get_model("auth", "User")

    username = "manager"
    email = "supremepalacemanagement@gmail.com"

    # Get the password from the environment.
    import os
    password = os.environ.get("SOCHIE_MANAGER_PASSWORD")

    if not password:
        raise RuntimeError(
            "SOCHIE_MANAGER_PASSWORD environment variable is not set."
        )

    user, created = User.objects.get_or_create(
        username=username,
        defaults={
            "email": email,
            "is_staff": True,
            "is_superuser": True,
            "is_active": True,
            "password": make_password(password),
        },
    )

    if not created:
        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(
            update_fields=[
                "email",
                "is_staff",
                "is_superuser",
                "is_active",
            ]
        )


def reverse_manager_admin(apps, schema_editor):
    User = apps.get_model("auth", "User")
    User.objects.filter(
        username="manager"
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            create_manager_admin,
            reverse_manager_admin,
        ),
    ]