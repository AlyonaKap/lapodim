from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters import rest_framework as filters
from .models import Animal, Adoption, Character
from .serializers import (
    AdoptionSerializer,
    AdoptionStatusUpdateSerializer,
    AnimalSerializer,
    CharacterSerializer,
)
from .pagination import AnimalPagination


class AnimalFilter(filters.FilterSet):

    animal_type = filters.CharFilter(field_name='animal_type__name', lookup_expr='iexact')
    animal_type_id = filters.NumberFilter(field_name='animal_type__id')

    character = filters.CharFilter(method='filter_by_characters')

    age_min = filters.DateFilter(field_name='age', lookup_expr='gte')
    age_max = filters.DateFilter(field_name='age', lookup_expr='lte')

    class Meta:
        model = Animal
        fields = {
            'gender': ['exact'],
            'size': ['exact'],
            'is_adopted': ['exact'],
        }

    def filter_by_characters(self, queryset, name, value):
        character_names = [c.strip() for c in value.split(',') if c.strip()]
        if not character_names:
            return queryset
        return queryset.filter(characters__name__in=character_names).distinct()


class AnimalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Animal.objects.select_related('animal_type').prefetch_related('characters').order_by('-id')
    serializer_class = AnimalSerializer
    pagination_class = AnimalPagination
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    filterset_class = AnimalFilter
    search_fields = ['name', 'description']


class CharacterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Character.objects.order_by('name')
    serializer_class = CharacterSerializer
    pagination_class = None


class AdoptionViewSet(viewsets.ModelViewSet):
    serializer_class = AdoptionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    filter_backends = [filters.DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status']
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    search_fields = ['animal__name', 'user__email']

    def get_queryset(self):
        queryset = Adoption.objects.select_related(
            'animal',
            'animal__animal_type',
            'user',
        ).prefetch_related('animal__characters')

        if self.request.user.is_staff:
            return queryset.order_by('-created_at')

        return queryset.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        self.permission_denied(
            request,
            message="Use PATCH to update adoption status.",
        )

    def partial_update(self, request, *args, **kwargs):
        if not request.user.is_staff:
            self.permission_denied(
                request,
                message="Only staff users can update adoption status.",
            )

        adoption = self.get_object()
        serializer = AdoptionStatusUpdateSerializer(
            adoption,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response_serializer = self.get_serializer(adoption)

        return Response(response_serializer.data)
