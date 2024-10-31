from rest_framework import serializers
from api_dashboard.models import GameHistory

class GameHistorySerializer(serializers.ModelSerializer):
	class Meta:
		model = GameHistory
		fields = '__all__'