from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdoptionViewSet, AnimalViewSet, CharacterViewSet

router = DefaultRouter()
router.register(r'characters', CharacterViewSet, basename='character')
router.register(r'adoptions', AdoptionViewSet, basename='adoption')
router.register(r'', AnimalViewSet, basename='animal')

urlpatterns = [
    path('', include(router.urls)),
]
