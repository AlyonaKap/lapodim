import jwt

from datetime import datetime, timezone
from django.conf import settings


ACCESS_TOKEN_TYPE = 'access'
REFRESH_TOKEN_TYPE = 'refresh'


def generate_access_token(user):
    return _generate_token(
        user=user,
        token_type=ACCESS_TOKEN_TYPE,
        lifetime=settings.ACCESS_TOKEN_LIFETIME,
    )


def generate_refresh_token(user):
    return _generate_token(
        user=user,
        token_type=REFRESH_TOKEN_TYPE,
        lifetime=settings.REFRESH_TOKEN_LIFETIME,
    )


def decode_token(token):
    return jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])


def _generate_token(user, token_type, lifetime):
    expires_at = datetime.now(timezone.utc) + lifetime
    payload = {
        'id': user.pk,
        'email': user.email,
        'token_type': token_type,
        'exp': int(expires_at.timestamp()),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

    return token if isinstance(token, str) else token.decode('utf-8')
