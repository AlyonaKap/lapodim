from django.urls import path, include

urlpatterns = [
    path('animals/', include('api.animals.urls')),
    path('users/', include('api.user.urls')),
]
