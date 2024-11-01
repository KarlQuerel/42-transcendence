import random
from django.core.management.base import BaseCommand
from api_dashboard.models import GameHistory
from api_user.models import CustomUser
from datetime import datetime
from django.utils import timezone

class Command(BaseCommand):
	help = 'Populates the database with random game history data'

	def handle(self, *args, **kwargs):
		users = CustomUser.objects.all()
		games_per_pair = lambda: random.randint(2, 5)  # Each pair has between 2 to 5 games
		predefined_games = []

		# Generate games between each user pair
		for user in users:
			for opponent in users:
				if user != opponent:
					num_games = games_per_pair()
					for _ in range(num_games):
						myScore, opponentScore = (10, random.randint(0, 9)) if random.random() > 0.5 else (random.randint(0, 9), 10)
						game_date = datetime.strptime(f'2024-{random.randint(1, 12)}-{random.randint(1, 28)}', '%Y-%m-%d')
						game_date = timezone.make_aware(game_date)

						# Add game to the user
						predefined_games.append({
							'myUsername': user.username,
							'opponentUsername': opponent.username,
							'myScore': myScore,
							'opponentScore': opponentScore,
							'date': game_date
						})

						# Add the reverse game to the opponent
						predefined_games.append({
							'myUsername': opponent.username,
							'opponentUsername': user.username,
							'myScore': opponentScore,
							'opponentScore': myScore,
							'date': game_date
						})

		# Insert the games into the database
		for game in predefined_games:
			try:
				user = CustomUser.objects.get(username=game['myUsername'])
				if not GameHistory.objects.filter(
						user=user,
						myUsername=game['myUsername'],
						opponentUsername=game['opponentUsername'],
						date=game['date']).exists():
					GameHistory.objects.create(
						user=user,
						myUsername=game['myUsername'],
						opponentUsername=game['opponentUsername'],
						myScore=game['myScore'],
						opponentScore=game['opponentScore'],
						date=game['date']
					)
					self.stdout.write(self.style.SUCCESS(f'Added game: {game["myUsername"]} vs {game["opponentUsername"]} on {game["date"]}'))
				else:
					self.stdout.write(self.style.WARNING(f'Game history already exists for {game["myUsername"]} vs {game["opponentUsername"]} on {game["date"]}'))
			except CustomUser.DoesNotExist:
				self.stdout.write(self.style.ERROR(f'User {game["myUsername"]} does not exist'))

