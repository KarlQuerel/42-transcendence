from rest_framework import serializers
from .models import FriendRequest

class FriendRequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = FriendRequest
		fields = ['id', 'sender', 'receiver', 'created_at', 'request_status']
		read_only_fields = ['sender']