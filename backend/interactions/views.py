from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import Interaction, HCP, ChatMessage
from .serializers import (
    InteractionSerializer,
    InteractionCreateSerializer,
    HCPSerializer,
    ChatMessageSerializer
)


class InteractionViewSet(viewsets.ModelViewSet):
    queryset = Interaction.objects.all()
    serializer_class = InteractionSerializer
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'log_interaction':
            return InteractionCreateSerializer
        return InteractionSerializer
    
    @action(detail=False, methods=['post'])
    def log_interaction(self, request):
        """Log a new HCP interaction"""
        serializer = InteractionCreateSerializer(data=request.data)
        if serializer.is_valid():
            interaction = serializer.save()
            
            # AI processing would happen here
            # For now, generate basic summary
            interaction.ai_summary = f"Interaction with {interaction.hcp.name} on {interaction.date}"
            interaction.extracted_entities = {
                'hcp': interaction.hcp.name,
                'specialty': interaction.hcp.specialty,
                'discussion_points': len(interaction.discussion_points),
                'products': len(interaction.products_discussed)
            }
            interaction.save()
            
            response_serializer = InteractionSerializer(interaction)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get', 'post'])
    def chat(self, request, pk=None):
        """Chat endpoint for conversational interaction logging"""
        interaction = self.get_object()
        
        if request.method == 'GET':
            messages = ChatMessage.objects.filter(interaction=interaction)
            serializer = ChatMessageSerializer(messages, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            message_content = request.data.get('message', '')
            
            # Store user message
            user_msg = ChatMessage.objects.create(
                interaction=interaction,
                role='user',
                content=message_content
            )
            
            # Generate AI response (would integrate with LangGraph here)
            ai_response = f"Processing: {message_content}"
            ai_msg = ChatMessage.objects.create(
                interaction=interaction,
                role='assistant',
                content=ai_response
            )
            
            serializer = ChatMessageSerializer(ai_msg)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def edit_interaction(self, request, pk=None):
        """Edit an existing interaction"""
        interaction = self.get_object()
        
        for field, value in request.data.items():
            if hasattr(interaction, field):
                setattr(interaction, field, value)
        
        interaction.save()
        serializer = InteractionSerializer(interaction)
        return Response(serializer.data)


class ChatViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['post'])
    def send_message(self, request):
        """Send a chat message"""
        interaction_id = request.data.get('interaction_id')
        message = request.data.get('message')
        
        interaction = get_object_or_404(Interaction, id=interaction_id)
        
        # Store user message
        ChatMessage.objects.create(
            interaction=interaction,
            role='user',
            content=message
        )
        
        # Generate AI response
        ai_response = f"AI processing: {message}"
        ai_msg = ChatMessage.objects.create(
            interaction=interaction,
            role='assistant',
            content=ai_response
        )
        
        serializer = ChatMessageSerializer(ai_msg)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


def hello_world(request):
    """Simple hello world view for testing"""
    return Response({'message': 'HCP CRM API is running'})
