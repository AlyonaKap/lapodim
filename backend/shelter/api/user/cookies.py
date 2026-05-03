from django.conf import settings
from rest_framework.response import Response


def set_refresh_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        settings.REFRESH_COOKIE_NAME,
        token,
        httponly=True,
        max_age=settings.REFRESH_COOKIE_MAX_AGE,
        samesite=settings.AUTH_COOKIE_SAMESITE,
        secure=settings.AUTH_COOKIE_SECURE,
    )


def clear_refresh_cookie(response: Response) -> None:
    response.delete_cookie(
        settings.REFRESH_COOKIE_NAME,
        samesite=settings.AUTH_COOKIE_SAMESITE,
    )
