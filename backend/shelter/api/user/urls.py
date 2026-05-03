from django.urls import include, path
from .views import (
    LoginAPIView,
    LogoutAPIView,
    RegistrationAPIView,
    TokenRefreshAPIView,
    UserProfileAPIView,
    UserRetrieveUpdateAPIView,
    UserLikeViewSet,
)
from rest_framework.routers import DefaultRouter

app_name = 'user'
router = DefaultRouter()

router.register(r'likes', UserLikeViewSet, basename='user-like')

urlpatterns = [
    path('user/', UserRetrieveUpdateAPIView.as_view(), name='user'),
    path('profile/<int:pk>/', UserProfileAPIView.as_view(), name='user-profile'),
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshAPIView.as_view(), name='token-refresh'),
    path('', include(router.urls)),
]
