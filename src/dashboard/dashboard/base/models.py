from django.db import models

class Stats(models.Model):
	username = models.CharField(max_length=200)
	#TODO: avatar = img (aller la chercher dans base de donnees jess)
	nb_of_victories = models.fields.IntegerField()
	nb_of_defeats = models.fields.IntegerField()
	# badge = models.fields.IntegerField() #only 4 possibilities
	#badge = affichage d une image
	#0=none, 1=gold, 2=silver, 3=bronze
	# ranking_position = models.fields.IntegerField()
	#if else dans le tuto :
	#if ranking_position <= 10
	#   if 10 <= ranking_position < 5
	#       you are in the top 10 players!
	#   if 5 <= ranking_position <= 1
	#       you are in the top 5 players!
	#   if 3 <= ranking_position <= 1
	#      "You are the top {ranking position} player!"
	#   else if ranking position == 1
	#       You're the best player ever!
	# nb_of_games_played = models.fields.IntegerField()
	#Afficher : you won X% of your games! (X = nb_of_victories/nb_of_games * 100)
	#Afficher le ranking general avec tous les usernames
	#equivalent de std::map en c++ pq le sujet specifie que
	#je dois avoir un historique des parties jouees donc je
	#dois avoir un containeur avec les logins des joueurs et
	#les points de chacun
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



# class Stats(models.Model):
# 	username = models.CharField(max_length=100, unique=True)
# 	nb_of_victories = models.IntegerField(default=0)
# 	nb_of_defeats = models.IntegerField(default=0)

# 	def __str__(self):
# 		return self.username

# class GameHistory(models.Model):
# 	user = models.ForeignKey(Stats, related_name='games_as_user', on_delete=models.CASCADE)
# 	opponent = models.ForeignKey(Stats, related_name='games_as_opponent', on_delete=models.CASCADE)
# 	opponent_score = models.IntegerField()
# 	my_score = models.IntegerField()
# 	date = models.DateField()

# 	def __str__(self):
# 		return f"{self.user.username} vs {self.opponent.username} on {self.date}"
