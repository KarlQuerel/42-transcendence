# from django.core.management.base import BaseCommand
# from base.models import Stats, GameHistory
# from api_user.models import CustomUser

# class Command(BaseCommand):
# 	def handle(self, *args, **kwargs):
# 		predefined_data = [
# 			{
# 				'username': 'karl',
# 				'nb_of_victories': 2,
# 				'nb_of_defeats': 5,
# 				'games': [
# 					{'opponentUsername': 'clement', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-10'},
# 					{'opponentUsername': 'jess', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'clement', 'opponentScore': 10, 'myScore': 2, 'date': '2024-09-10'},
# 					{'opponentUsername': 'jess', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
# 					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 4, 'date': '2024-09-11'},
# 					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 8, 'date': '2024-09-11'},
# 					{'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 9, 'date': '2024-09-11'},
# 				]
# 			},
# 			{
# 				'username': 'clement',
# 				'nb_of_victories': 3,
# 				'nb_of_defeats': 2,
# 				'games': [
# 					{'opponentUsername': 'AI', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 6, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'karl', 'opponentScore': 5, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
# 				]
# 			},
# 			{
# 				'username': 'jess',
# 				'nb_of_victories': 2,
# 				'nb_of_defeats': 1,
# 				'games': [
# 					{'opponentUsername': 'clement', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'karl', 'opponentScore': 9, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
# 				]
# 			},
# 			{
# 				'username': 'carolina',
# 				'nb_of_victories': 9,
# 				'nb_of_defeats': 2,
# 				'games': [
# 					{'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'clement', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 4, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'karl', 'opponentScore': 1, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 10, 'myScore': 6, 'date': '2024-09-11'},
# 					{'opponentUsername': 'clement', 'opponentScore': 10, 'myScore': 5, 'date': '2024-09-11'},
# 				]
# 			},
# 		]

# 		for user_data in predefined_data:
# 			try:
# 				# Check if the user exists in the CustomUser model
# 				user = CustomUser.objects.get(username=user_data['username'])
# 				self.stdout.write(self.style.SUCCESS(f'User "{user_data["username"]}" exists in the user database'))
# 				if GameHistory.objects.filter(stats__username=user_data['username']).exists():
# 					self.stdout.write(self.style.WARNING(f'User "{user_data["username"]}" already has stats: skipping'))
# 				else:
# 					self.stdout.write(self.style.SUCCESS(f'Creating new stats entries for user "{user_data["username"]}"'))
# 					# Create the Stats entry in the dashboard database
# 					stats_entry, created = Stats.objects.update_or_create(
# 						username=user_data['username'],
# 						defaults={
# 							'nb_of_victories': user_data['nb_of_victories'],
# 							'nb_of_defeats': user_data['nb_of_defeats']
# 						})
# 					# Add game history
# 					for game in user_data['games']:
# 						GameHistory.objects.create(
# 							stats=stats_entry,
# 							opponentUsername=game['opponentUsername'],
# 							opponentScore=game['opponentScore'],
# 							myScore=game['myScore'],
# 							date=game['date']
# 						)
# 				self.stdout.write(self.style.SUCCESS('Successfully populated the dashboard database'))

# 			except CustomUser.DoesNotExist:
# 				self.stdout.write(self.style.WARNING(f'User "{user_data["username"]}" does not exist in the user database, skipping'))






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
					{'opponentUsername': 'clement', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-10'},
					{'opponentUsername': 'jess', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 0, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 2, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'clement',
				'games': [
					{'opponentUsername': 'karl', 'opponentScore': 10, 'myScore': 6, 'date': '2024-09-10'},
					{'opponentUsername': 'jess', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'jess',
				'games': [
					{'opponentUsername': 'karl', 'opponentScore': 9, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'clement', 'opponentScore': 10, 'myScore': 3, 'date': '2024-09-11'},
					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 1, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 2, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'carolina',
				'games': [
					{'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'clement', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'jess', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 5, 'myScore': 10, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'AI',
				'games': [
					{'opponentUsername': 'karl', 'opponentScore': 2, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'clement', 'opponentScore': 10, 'myScore': 8, 'date': '2024-09-11'},
					{'opponentUsername': 'jess', 'opponentScore': 10, 'myScore': 2, 'date': '2024-09-11'},
					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 5, 'date': '2024-09-11'},
				]
			},
		]

		for user_data in predefined_data:
			try:
				user = CustomUser.objects.get(username=user_data['username'])
				for game in user_data['games']:
					GameHistory.objects.create(
						user=user,
						opponentUsername=game['opponentUsername'],
						opponentScore=game['opponentScore'],
						myScore=game['myScore'],
						date=datetime.strptime(game['date'], '%Y-%m-%d')
					)
				self.stdout.write(self.style.SUCCESS(f'Successfully added game history for {user.username}'))
			except CustomUser.DoesNotExist:
				self.stdout.write(self.style.ERROR(f'User {user_data["username"]} does not exist'))