from rest_framework import serializers #pip install djangorestframework to stop warning?
from base.models import GameHistory
# from api_user.models import CustomUser

class GameHistorySerializer(serializers.ModelSerializer):
	class Meta:
		model = GameHistory
		fields = '__all__'