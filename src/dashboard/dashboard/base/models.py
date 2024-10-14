from django.db import models

class Stats(models.Model):
	username = models.CharField(max_length=200)
	#TODO: avatar = img (aller la chercher dans base de donnees jess)
	nb_of_victories = models.fields.IntegerField()
	nb_of_defeats = models.fields.IntegerField()
	@property # This method fetches all related GameHistory for this Stats instance
	def game_history(self):
		return GameHistory.objects.filter(stats=self)

class GameHistory(models.Model):
	#ForeignKey to link GameHistory to Stats
	stats = models.ForeignKey(Stats, related_name='games_history', on_delete=models.CASCADE)
	opponentUsername = models.CharField(max_length=200)
	opponentScore = models.IntegerField()
	myScore = models.IntegerField()
	date = models.DateTimeField(null=True, blank=True)
