from django.core.management.base import BaseCommand
from base.models import GameHistory
from api_user.models import CustomUser
from datetime import datetime

class Command(BaseCommand):
	help = 'Populates the database with predefined game history data'

	def handle(self, *args, **kwargs):
		predefined_data = [
					{
				'username': 'karl',
				'games': [
					{'myUsername': 'karl', 'opponentUsername': 'clement', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-10'},
					{'myUsername': 'karl', 'opponentUsername': 'jess', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
					{'myUsername': 'karl', 'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 0, 'date': '2024-09-11'},
					{'myUsername': 'karl', 'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 2, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'clement',
				'games': [
					{'myUsername': 'clement', 'opponentUsername': 'karl', 'opponentScore': 10, 'myScore': 6, 'date': '2024-09-10'},
					{'myUsername': 'clement', 'opponentUsername': 'jess', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
					{'myUsername': 'clement', 'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
					{'myUsername': 'clement', 'opponentUsername': 'AI', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'jess',
				'games': [
					{'myUsername': 'jess', 'opponentUsername': 'karl', 'opponentScore': 9, 'myScore': 10, 'date': '2024-09-11'},
					{'myUsername': 'jess', 'opponentUsername': 'clement', 'opponentScore': 10, 'myScore': 3, 'date': '2024-09-11'},
					{'myUsername': 'jess', 'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 1, 'date': '2024-09-11'},
					{'myUsername': 'jess', 'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 2, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'carolina',
				'games': [
					{'myUsername': 'carolina', 'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
					{'myUsername': 'carolina', 'opponentUsername': 'clement', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-11'},
					{'myUsername': 'carolina', 'opponentUsername': 'jess', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
					{'myUsername': 'carolina', 'opponentUsername': 'AI', 'opponentScore': 5, 'myScore': 10, 'date': '2024-09-11'},
				]
			},
		]

		for user_data in predefined_data:
			try:
				user = CustomUser.objects.get(username=user_data['username'])
				for game in user_data['games']:
					if GameHistory.objects.filter(user=user, myUsername=game['myUsername'], opponentUsername=game['opponentUsername'], date=datetime.strptime(game['date'], '%Y-%m-%d')).exists():
						self.stdout.write(self.style.WARNING(f'Game history for {user.username} already exists'))
						continue
					
					GameHistory.objects.create(
						user=user,
						myUsername=game['myUsername'],
						opponentUsername=game['opponentUsername'],
						opponentScore=game['opponentScore'],
						myScore=game['myScore'],
						date=datetime.strptime(game['date'], '%Y-%m-%d')
					)
				self.stdout.write(self.style.SUCCESS(f'Successfully added game history for {user.username}'))
			except CustomUser.DoesNotExist:
				self.stdout.write(self.style.ERROR(f'User {user_data["username"]} does not exist'))