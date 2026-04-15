from django.contrib import admin
from api.animals.models import AnimalType, Character, Animal

@admin.register(AnimalType)
class AnimalTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'gender', 'size', 'is_adopted', 'animal_type')
    list_filter = ('is_adopted', 'animal_type', 'gender', 'size')
    search_fields = ('name', 'description')
    ordering = ('-created_at',)

