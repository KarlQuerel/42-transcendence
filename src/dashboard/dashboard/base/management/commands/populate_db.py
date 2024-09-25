from django.core.management.base import BaseCommand
from base.models import Stats, GameHistory
from faker import Faker
import random
import string



#********************************************
#			GENERATE RANDOM USERS			#
#********************************************

# fake = Faker()

# class Command(BaseCommand):
#     help = 'Populates the database with random user'

#     def handle(self, *args, **kwargs):
#         for _ in range(10):
#             Stats.objects.create(
#                 username=''.join(random.choices(string.ascii_letters, k=8)),
#                 nb_of_victories=random.randint(0, 100),
#                 nb_of_defeats=random.randint(0, 100),
#                 badge=random.randint(0, 4),
#                 ranking_position=random.randint(1, 1000),
#                 nb_of_games_played=random.randint(0, 200)
#             )
#         self.stdout.write(self.style.SUCCESS('Successfully populated the database'))



#********************************************
#			ADD MANUALLY ENTERED USERS		#
#********************************************


class Command(BaseCommand):
	def handle(self, *args, **kwargs):
		predefined_data = [
			{
				'username': 'Karl',
				'nb_of_victories': 2,
				'nb_of_defeats': 5,
				'games': [
					{'opponentUsername': 'Clément', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-10'},
					{'opponentUsername': 'Jess', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Clément', 'opponentScore': 10, 'myScore': 2, 'date': '2024-09-10'},
					{'opponentUsername': 'Jess', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
					{'opponentUsername': 'Carolina', 'opponentScore': 10, 'myScore': 4, 'date': '2024-09-11'},
					{'opponentUsername': 'Carolina', 'opponentScore': 10, 'myScore': 8, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 9, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'Clément',
				'nb_of_victories': 3,
				'nb_of_defeats': 2,
				'games': [
					{'opponentUsername': 'AI', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 6, 'date': '2024-09-11'},
					{'opponentUsername': 'Jess', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Karl', 'opponentScore': 5, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Carolina', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'Jess',
				'nb_of_victories': 2,
				'nb_of_defeats': 1,
				'games': [
					{'opponentUsername': 'Clément', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Karl', 'opponentScore': 9, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Carolina', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'Carolina',
				'nb_of_victories': 10,
				'nb_of_defeats': 0,
				'games': [
					{'opponentUsername': 'Karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Jess', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Clément', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Jess', 'opponentScore': 4, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Karl', 'opponentScore': 1, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Jess', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'Clément', 'opponentScore': 5, 'myScore': 10, 'date': '2024-09-11'},
				]
			},
		]

		# # Iterate over predefined data and create entries in the database
		# for user_data in predefined_data:
		# 	stats_entry = Stats.objects.create(
		# 		username=user_data['username'],
		# 		nb_of_victories=user_data['nb_of_victories'],
		# 		nb_of_defeats=user_data['nb_of_defeats'],
		# 	)

		# # Create GameHistory entries
		# for game in user_data['games']:
		# 	GameHistory.objects.create(
		# 		stats=stats_entry, # Link to the Stats entry
		# 		opponentUsername=game['opponentUsername'],
		# 		opponentScore=game['opponentScore'],
		# 		myScore=game['myScore'],
		# 		date=game['date']
		# 	)

		# Iterate over predefined data and create entries in the database
		for user_data in predefined_data:
			print(f"Processing user: {user_data['username']}")
			stats_entry = Stats.objects.create(
				username=user_data['username'],
				nb_of_victories=user_data['nb_of_victories'],
				nb_of_defeats=user_data['nb_of_defeats'],
			)
			print(f"Created Stats entry for {user_data['username']}")

			# Create GameHistory entries
			for game in user_data['games']:
				print(f"Creating GameHistory for {user_data['username']} against {game['opponentUsername']}")
				GameHistory.objects.create(
					stats=stats_entry,  # Link to the Stats entry
					opponentUsername=game['opponentUsername'],
					opponentScore=game['opponentScore'],
					myScore=game['myScore'],
					date=game['date']
				)
			print(f"Finished processing games for {user_data['username']}")

		self.stdout.write(self.style.SUCCESS('Successfully populated the database with predefined users'))

		# for user_data in predefined_data:
		# 	user, created = Stats.objects.get_or_create(username=user_data['username'])
		# 	user.nb_of_victories = user_data['nb_of_victories']
		# 	user.nb_of_defeats = user_data['nb_of_defeats']
		# 	user.save()

		# 	for game_data in user_data['games']:
		# 		try:
		# 			opponent = Stats.objects.get(username=game_data['opponentUsername'])
		# 		except Stats.DoesNotExist:
		# 			print(f"Opponent {game_data['opponentUsername']} does not exist. Skipping this game.")
		# 			continue

		# 		# Create GameHistory entry
		# 		GameHistory.objects.create(
		# 			stats=user,
		# 			opponentUsername=game_data['opponentUsername'],
		# 			opponentScore=game_data['opponentScore'],
		# 			myScore=game_data['myScore'],
		# 			date=game_data['date']
		# 		)

		# 	print(f"User {user.username} with games: {user_data['games']} saved successfully.")




#********************************************
#				HOW TO USE					#
#********************************************

#TODO: mettre ça dans le makefile ou le dockerfile : il faut le faire à chaque make pour avoir des données persistantes
#access the running dashboard container : "docker exec -it Dashboard bash"
#run "python manage.py populate_db" before "python manage.py runserver"

