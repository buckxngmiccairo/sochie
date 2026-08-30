"""
Django settings for config project.
"""

from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent


# ==================================================
# Security
# ==================================================

SECRET_KEY = config("SECRET_KEY")

DEBUG = config("DEBUG", cast=bool)

DJANGO_ENV = config(
    "DJANGO_ENV",
    default="development",
)

ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS",
    cast=lambda v: [host.strip() for host in v.split(",")]
)


# ==================================================
# Applications
# ==================================================

INSTALLED_APPS = [

    # Django Apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third Party Apps
    "rest_framework",
    "corsheaders",

    # Sochie Apps
    "apps.accounts",
    "apps.music",
    "apps.albums",
    "apps.tours",
    "apps.store",
    "apps.contact",
]


# ==================================================
# Middleware
# ==================================================

MIDDLEWARE = [

    "django.middleware.security.SecurityMiddleware",

    "corsheaders.middleware.CorsMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",

]


# ==================================================
# Production Security
# ==================================================

if DJANGO_ENV == "production":

    SECURE_SSL_REDIRECT = True

    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

    SECURE_PROXY_SSL_HEADER = (
        "HTTP_X_FORWARDED_PROTO",
        "https",
    )

    SECURE_CONTENT_TYPE_NOSNIFF = True


# ==================================================
# URLs
# ==================================================

ROOT_URLCONF = "config.urls"


# ==================================================
# Templates
# ==================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "config.wsgi.application"


# ==================================================
# Database
# ==================================================

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("DB_NAME"),
        "USER": config("DB_USER"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": config(
            "DB_HOST",
            default="localhost",
        ),
        "PORT": config(
            "DB_PORT",
            default="5432",
        ),
    }
}


# ==================================================
# Password Validation
# ==================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# ==================================================
# Internationalization
# ==================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# ==================================================
# Static & Media
# ==================================================

STATIC_URL = "static/"

STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"


# ==================================================
# Default Primary Key
# ==================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ==================================================
# CORS
# ==================================================

CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in config(
        "CORS_ALLOWED_ORIGINS",
        default="http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

CORS_ALLOW_CREDENTIALS = True


# ==================================================
# Django REST Framework
# ==================================================

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
}


# ==================================================
# Paystack
# ==================================================

PAYSTACK_PUBLIC_KEY = config(
    "PAYSTACK_PUBLIC_KEY"
)

PAYSTACK_SECRET_KEY = config(
    "PAYSTACK_SECRET_KEY"
)

PAYSTACK_CALLBACK_URL = config(
    "PAYSTACK_CALLBACK_URL"
)

FRONTEND_URL = config(
    "FRONTEND_URL",
    default="http://localhost:3000",
)