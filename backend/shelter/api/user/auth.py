from rest_framework import authentication, exceptions

from .models import User
from .tokens import ACCESS_TOKEN_TYPE, decode_token


class JWTAuthentication(authentication.BaseAuthentication):
    authentication_header_prefix = 'Bearer'

    def authenticate_header(self, request):
        return self.authentication_header_prefix

    def authenticate(self, request):
        request.user = None

        auth_header = authentication.get_authorization_header(request).split()
        auth_header_prefix = self.authentication_header_prefix.lower()

        if not auth_header:
            return None

        if len(auth_header) == 1:
            return None

        elif len(auth_header) > 2:
            return None

        prefix = auth_header[0].decode('utf-8')
        token = auth_header[1].decode('utf-8')

        if prefix.lower() not in (auth_header_prefix, 'token'):
            return None

        return self._authenticate_credentials(request, token)

    def _authenticate_credentials(self, request, token):
        try:
            payload = decode_token(token)
        except Exception:
            msg = 'Помилка автентифікації. Неможливо декодувати токен'
            raise exceptions.AuthenticationFailed(msg)

        if payload.get('token_type') != ACCESS_TOKEN_TYPE:
            msg = 'Помилка автентифікації. Потрібен access token'
            raise exceptions.AuthenticationFailed(msg)

        try:
            user = User.objects.get(pk=payload['id'])
        except User.DoesNotExist:
            msg = 'Користувач не знайдений'
            raise exceptions.AuthenticationFailed(msg)

        if not user.is_active:
            msg = 'Користувач деактивований'
            raise exceptions.AuthenticationFailed(msg)

        return (user, token)
