from django.db import models
from django.contrib.auth.models import User


class HCP(models.Model):
    """Healthcare Professional Model"""
    SPECIALTY_CHOICES = [
        ('cardiology', 'Cardiology'),
        ('neurology', 'Neurology'),
        ('oncology', 'Oncology'),
        ('pediatrics', 'Pediatrics'),
        ('psychiatry', 'Psychiatry'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=200)
    specialty = models.CharField(max_length=50, choices=SPECIALTY_CHOICES)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    organization = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.specialty}"


class Interaction(models.Model):
    """HCP Interaction Model"""
    INTERACTION_TYPE_CHOICES = [
        ('meeting', 'Meeting'),
        ('call', 'Call'),
        ('email', 'Email'),
        ('conference', 'Conference'),
    ]
    
    OUTCOME_CHOICES = [
        ('positive', 'Positive'),
        ('neutral', 'Neutral'),
        ('negative', 'Negative'),
    ]
    
    hcp = models.ForeignKey(HCP, on_delete=models.CASCADE, related_name='interactions')
    interaction_type = models.CharField(max_length=20, choices=INTERACTION_TYPE_CHOICES)
    date = models.DateField()
    duration_minutes = models.IntegerField(default=30)
    discussion_points = models.JSONField(default=list)
    products_discussed = models.JSONField(default=list)
    notes = models.TextField(blank=True)
    ai_summary = models.TextField(blank=True)
    extracted_entities = models.JSONField(default=dict)
    outcome = models.CharField(max_length=20, choices=OUTCOME_CHOICES, default='neutral')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date', '-created_at']
    
    def __str__(self):
        return f"Interaction with {self.hcp.name} on {self.date}"


class InteractionEdit(models.Model):
    """Audit trail for interaction edits"""
    interaction = models.ForeignKey(Interaction, on_delete=models.CASCADE, related_name='edits')
    editor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    changed_fields = models.JSONField(default=dict)
    edit_reason = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Edit of {self.interaction} by {self.editor}"


class ChatMessage(models.Model):
    """Chat messages for conversational interaction logging"""
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    ]
    
    interaction = models.ForeignKey(Interaction, on_delete=models.CASCADE, related_name='chat_messages')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.role}: {self.content[:50]}"
