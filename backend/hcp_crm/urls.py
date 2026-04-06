"""
URL configuration for HCP CRM project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from interactions.views import InteractionViewSet, ChatViewSet

router = DefaultRouter()
router.register(r'interactions', InteractionViewSet, basename='interaction')
router.register(r'chat', ChatViewSet, basename='chat')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
