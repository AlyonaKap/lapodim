from django.contrib import admin
from api.user.models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'surname', 'email', 'phone', 'is_active', 'is_staff', 'date')
    list_filter = ('is_active', 'is_staff', 'date')
    search_fields = ('name', 'surname', 'email', 'phone')
    ordering = ('-date',)