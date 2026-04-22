from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters
from .models import Animal
from .serializers import AnimalSerializer
from .pagination import AnimalPagination


class AnimalFilter(filters.FilterSet):

    animal_type = filters.CharFilter(field_name='animal_type__name', lookup_expr='iexact')
    animal_type_id = filters.NumberFilter(field_name='animal_type__id')

    character = filters.CharFilter(field_name='characters__name', lookup_expr='iexact')

    age_min = filters.DateFilter(field_name='age', lookup_expr='lte')  
    age_max = filters.DateFilter(field_name='age', lookup_expr='gte')  

    class Meta:
        model = Animal
        fields = {
            'gender': ['exact'],
            'size': ['exact'],
            'is_adopted': ['exact'],
        }


class AnimalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Animal.objects.select_related('animal_type').prefetch_related('characters').order_by('-id')
    serializer_class = AnimalSerializer
    pagination_class = AnimalPagination
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    filterset_class = AnimalFilter
    search_fields = ['name']

