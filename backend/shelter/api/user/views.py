from django.conf import settings
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView

from .serializers import UserLikeSerializer, UserRegisterSerializer, LoginSerializer, UserSerializer, UserPublicProfileSerializer
from .renders import UserJSONRenderer
from .models import User, UserLike
from .cookies import clear_refresh_cookie, set_refresh_cookie
from .tokens import REFRESH_TOKEN_TYPE, decode_token, generate_access_token


def build_auth_response(serializer_data, response_status):
    user_data = dict(serializer_data)
    refresh = user_data.pop('refresh')
    response = Response(user_data, status=response_status)

    set_refresh_cookie(response, refresh)

    return response


class RegistrationAPIView(APIView):

    permission_classes = (AllowAny,)
    serializer_class = UserRegisterSerializer
    renderer_classes = (UserJSONRenderer,)

    def post(self, request):
        user = request.data.get('user', {})

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return build_auth_response(serializer.data, status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return build_auth_response(serializer.data, status.HTTP_200_OK)


class LogoutAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        clear_refresh_cookie(response)

        return response


class TokenRefreshAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        refresh_token = (
            request.data.get('refresh')
            or request.COOKIES.get(settings.REFRESH_COOKIE_NAME)
        )

        if refresh_token is None:
            return Response(
                {'errors': {'refresh': ['Refresh token відсутній']}},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            payload = decode_token(refresh_token)
        except Exception:
            return Response(
                {'errors': {'refresh': ['Refresh token недійсний']}},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if payload.get('token_type') != REFRESH_TOKEN_TYPE:
            return Response(
                {'errors': {'refresh': ['Потрібен refresh token']}},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            user = User.objects.get(pk=payload['id'])
        except User.DoesNotExist:
            return Response(
                {'errors': {'refresh': ['Користувач не знайдений']}},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_active:
            return Response(
                {'errors': {'refresh': ['Користувач деактивований']}},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {'access': generate_access_token(user)},
            status=status.HTTP_200_OK,
        )

class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})

        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserProfileAPIView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserPublicProfileSerializer
    queryset = User.objects.all()
    lookup_field = 'pk'

class UserLikeViewSet(viewsets.ModelViewSet):
    serializer_class = UserLikeSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return UserLike.objects.select_related(
            'animal',
            'animal__animal_type',
            'user',
        ).prefetch_related(
            'animal__characters',
        ).filter(
            user=self.request.user,
        ).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['delete'], url_path=r'by-animal/(?P<animal_id>\d+)')
    def delete_by_animal(self, request, animal_id=None):
        deleted_count, _ = UserLike.objects.filter(
            user=request.user,
            animal_id=animal_id,
        ).delete()

        if deleted_count == 0:
            return Response(
                {'detail': 'Like was not found.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(status=status.HTTP_204_NO_CONTENT)
