from django.db import models
from api_user.models import CustomUser

class GameHistory(models.Model):
	#ForeignKey to link GameHistory to User database
	user = models.ForeignKey(CustomUser, related_name='games_history', on_delete=models.CASCADE, default=1) # Provide a default user ID, otherwise the dashboard container keeps crashing
	myUsername = models.CharField(max_length=200, default='default_username')
	opponentUsername = models.CharField(max_length=200)
	opponentScore = models.IntegerField()
	myScore = models.IntegerField()
	date = models.DateTimeField(null=True, blank=True)