from django.contrib import admin
from .models import HCP, Interaction, InteractionEdit, ChatMessage


@admin.register(HCP)
class HCPAdmin(admin.ModelAdmin):
    list_display = ['name', 'specialty', 'created_at']
    list_filter = ['specialty', 'created_at']
    search_fields = ['name', 'email', 'organization']


@admin.register(Interaction)
class InteractionAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'interaction_type', 'outcome', 'created_at']
    list_filter = ['interaction_type', 'outcome', 'date']
    search_fields = ['hcp__name', 'notes']


@admin.register(InteractionEdit)
class InteractionEditAdmin(admin.ModelAdmin):
    list_display = ['interaction', 'editor', 'created_at']
    list_filter = ['created_at']
    search_fields = ['interaction__hcp__name']


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['interaction', 'role', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['content']
