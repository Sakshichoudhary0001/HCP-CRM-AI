from rest_framework import serializers
from .models import HCP, Interaction, InteractionEdit, ChatMessage


class HCPSerializer(serializers.ModelSerializer):
    class Meta:
        model = HCP
        fields = '__all__'


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'role', 'content', 'created_at']
        read_only_fields = ['created_at']


class InteractionEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteractionEdit
        fields = ['id', 'changed_fields', 'edit_reason', 'created_at']
        read_only_fields = ['created_at']


class InteractionSerializer(serializers.ModelSerializer):
    hcp_name = serializers.CharField(source='hcp.name', read_only=True)
    hcp_specialty = serializers.CharField(source='hcp.specialty', read_only=True)
    chat_messages = ChatMessageSerializer(many=True, read_only=True)
    edits = InteractionEditSerializer(many=True, read_only=True)
    
    class Meta:
        model = Interaction
        fields = [
            'id', 'hcp', 'hcp_name', 'hcp_specialty', 'interaction_type', 'date',
            'duration_minutes', 'discussion_points', 'products_discussed', 'notes',
            'ai_summary', 'extracted_entities', 'outcome', 'created_at', 'updated_at',
            'chat_messages', 'edits'
        ]
        read_only_fields = ['ai_summary', 'extracted_entities', 'created_at', 'updated_at']


class InteractionCreateSerializer(serializers.Serializer):
    hcp_name = serializers.CharField(max_length=200)
    specialty = serializers.ChoiceField(choices=HCP.SPECIALTY_CHOICES)
    interaction_type = serializers.ChoiceField(choices=Interaction.INTERACTION_TYPE_CHOICES)
    date = serializers.DateField()
    duration_minutes = serializers.IntegerField(default=30, min_value=0)
    discussion_points = serializers.ListField(child=serializers.CharField(), default=list)
    products_discussed = serializers.ListField(child=serializers.CharField(), default=list)
    notes = serializers.CharField(required=False, allow_blank=True)
    outcome = serializers.ChoiceField(choices=Interaction.OUTCOME_CHOICES, default='neutral')
    
    def create(self, validated_data):
        hcp_name = validated_data.pop('hcp_name')
        specialty = validated_data.pop('specialty')
        
        # Get or create HCP
        hcp, _ = HCP.objects.get_or_create(
            name=hcp_name,
            specialty=specialty,
            defaults={'name': hcp_name, 'specialty': specialty}
        )
        
        # Create Interaction
        interaction = Interaction.objects.create(hcp=hcp, **validated_data)
        
        return interaction
