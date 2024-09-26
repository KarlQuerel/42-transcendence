# from django.core.management.base import BaseCommand
# from base.models import Stats, GameHistory
# from api_user.models import CustomUser
# from faker import Faker
# import random
# import string



# #********************************************
# #			GENERATE RANDOM USERS			#
# #********************************************

# # fake = Faker()

# # class Command(BaseCommand):
# #     help = 'Populates the database with random user'

# #     def handle(self, *args, **kwargs):
# #         for _ in range(10):
# #             Stats.objects.create(
# #                 username=''.join(random.choices(string.ascii_letters, k=8)),
# #                 nb_of_victories=random.randint(0, 100),
# #                 nb_of_defeats=random.randint(0, 100),
# #                 badge=random.randint(0, 4),
# #                 ranking_position=random.randint(1, 1000),
# #                 nb_of_games_played=random.randint(0, 200)
# #             )
# #         self.stdout.write(self.style.SUCCESS('Successfully populated the database'))



# #********************************************
# #			ADD MANUALLY ENTERED USERS		#
# #********************************************


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
# 				'nb_of_victories': 10,
# 				'nb_of_defeats': 0,
# 				'games': [
# 					{'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'clement', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 4, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'karl', 'opponentScore': 1, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'clement', 'opponentScore': 5, 'myScore': 10, 'date': '2024-09-11'},
# 				]
# 			},
# 		]

# 		# # Iterate over predefined data and create entries in the database
# 		# for user_data in predefined_data:
# 		# 	stats_entry = Stats.objects.create(
# 		# 		username=user_data['username'],
# 		# 		nb_of_victories=user_data['nb_of_victories'],
# 		# 		nb_of_defeats=user_data['nb_of_defeats'],
# 		# 	)

# 		# # Create GameHistory entries
# 		# for game in user_data['games']:
# 		# 	GameHistory.objects.create(
# 		# 		stats=stats_entry, # Link to the Stats entry
# 		# 		opponentUsername=game['opponentUsername'],
# 		# 		opponentScore=game['opponentScore'],
# 		# 		myScore=game['myScore'],
# 		# 		date=game['date']
# 		# 	)



# 		# Iterate over predefined data and create entries in the database
# 		for user_data in predefined_data:
# 			print(f"Processing user: {user_data['username']}")
# 			stats_entry = Stats.objects.create(
# 				username=user_data['username'],
# 				nb_of_victories=user_data['nb_of_victories'],
# 				nb_of_defeats=user_data['nb_of_defeats'],
# 			)
# 			print(f"Created Stats entry for {user_data['username']}")

# 			# Create GameHistory entries
# 			for game in user_data['games']:
# 				print(f"Creating GameHistory for {user_data['username']} against {game['opponentUsername']}")
# 				GameHistory.objects.create(
# 					stats=stats_entry,  # Link to the Stats entry
# 					opponentUsername=game['opponentUsername'],
# 					opponentScore=game['opponentScore'],
# 					myScore=game['myScore'],
# 					date=game['date']
# 				)
# 			print(f"Finished processing games for {user_data['username']}")

# 		self.stdout.write(self.style.SUCCESS('Successfully populated the database with predefined users'))



# 		# for user_data in predefined_data:
# 		# 	user, created = Stats.objects.get_or_create(username=user_data['username'])
# 		# 	user.nb_of_victories = user_data['nb_of_victories']
# 		# 	user.nb_of_defeats = user_data['nb_of_defeats']
# 		# 	user.save()

# 		# 	for game_data in user_data['games']:
# 		# 		try:
# 		# 			opponent = Stats.objects.get(username=game_data['opponentUsername'])
# 		# 		except Stats.DoesNotExist:
# 		# 			print(f"Opponent {game_data['opponentUsername']} does not exist. Skipping this game.")
# 		# 			continue

# 		# 		# Create GameHistory entry
# 		# 		GameHistory.objects.create(
# 		# 			stats=user,
# 		# 			opponentUsername=game_data['opponentUsername'],
# 		# 			opponentScore=game_data['opponentScore'],
# 		# 			myScore=game_data['myScore'],
# 		# 			date=game_data['date']
# 		# 		)

# 		# 	print(f"User {user.username} with games: {user_data['games']} saved successfully.")


# # #TODO: vérifier que ça ne plante pas si on make fill_user et make fill_dashboard deux fois
# # # de suite (faut pas que ça rajoute deux fois les mêmes infos ou crée deux fois un user avec
# # # le même username)
# # 		for user_data in predefined_data:
# # 			user, created = CustomUser.objects.update_or_create(
# # 				username=user_data['username'],
# # 				defaults={
# # 					'password': user_data['password'],
# # 					'email': user_data['email'],
# # 					'date_of_birth': user_data['date_of_birth'],
# # 					'first_name': user_data['first_name'],
# # 					'last_name': user_data['last_name'],
# # 				}
# # 			)
# # 			if created:
# # 				self.stdout.write(self.style.SUCCESS(f'Successfully created user "{user_data["username"]}"'))
# # 			else:
# # 				self.stdout.write(self.style.SUCCESS(f'Successfully updated user "{user_data["username"]}"'))

# # 			# Create or update Stats entry
# # 			stats_entry, stats_created = Stats.objects.update_or_create(
# # 				username=user_data['username'],
# # 				defaults={
# # 					'nb_of_victories': user_data['nb_of_victories'],
# # 					'nb_of_defeats': user_data['nb_of_defeats'],
# # 				}
# # 			)
# # 			if stats_created:
# # 				self.stdout.write(self.style.SUCCESS(f'Created Stats entry for {user_data["username"]}'))
# # 			else:
# # 				self.stdout.write(self.style.SUCCESS(f'Updated Stats entry for {user_data["username"]}'))

# # 			# Create or update GameHistory entries
# # 			for game in user_data['games']:
# # 				GameHistory.objects.update_or_create(
# # 					stats=stats_entry,
# # 					opponentUsername=game['opponentUsername'],
# # 					defaults={
# # 						'opponentScore': game['opponentScore'],
# # 						'myScore': game['myScore'],
# # 						'date': game['date']
# # 					}
# # 				)
# # 				self.stdout.write(self.style.SUCCESS(f'Processed GameHistory for {user_data["username"]} against {game["opponentUsername"]}'))

# # 		self.stdout.write(self.style.SUCCESS('Successfully populated the database with predefined user data'))


# #********************************************
# #				HOW TO USE					#
# #********************************************

# #TODO: mettre ça dans le makefile ou le dockerfile : il faut le faire à chaque make pour avoir des données persistantes
# #access the running dashboard container : "docker exec -it Dashboard bash"
# #run "python manage.py populate_db" before "python manage.py runserver"


# #Pour vérifier la base de données:
# """
# docker exec -it Database bash
# psql -U postgres
# \c pong_database
# SELECT * FROM base_stats;
# """







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
# 				'nb_of_victories': 10,
# 				'nb_of_defeats': 0,
# 				'games': [
# 					{'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'clement', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 4, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'karl', 'opponentScore': 1, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'jess', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-11'},
# 					{'opponentUsername': 'clement', 'opponentScore': 5, 'myScore': 10, 'date': '2024-09-11'},
# 				]
# 			},
# 		]

# 		for user_data in predefined_data:
# 			try:
# 				user = CustomUser.objects.get(username=user_data['username'])
# 				self.stdout.write(self.style.SUCCESS(f'User "{user_data["username"]}" exists, updating stats and game history'))

# 				try:
# 					stats_entry = Stats.objects.get(username=user_data['username'])
# 					self.stdout.write(self.style.SUCCESS(f'Stats for user "{user_data["username"]}" found, updating stats and adding game history'))

# 					# Update stats
# 					stats_entry.nb_of_victories += user_data['nb_of_victories']
# 					stats_entry.nb_of_defeats += user_data['nb_of_defeats']
# 					stats_entry.save()
# 					self.stdout.write(self.style.SUCCESS(f'Successfully updated stats for "{user_data["username"]}"'))

# 					# Add game history
# 					for game in user_data['games']:
# 						GameHistory.objects.create(
# 							stats=stats_entry,
# 							opponentUsername=game['opponentUsername'],
# 							opponentScore=game['opponentScore'],
# 							myScore=game['myScore'],
# 							date=game['date']
# 						)
# 						self.stdout.write(self.style.SUCCESS(f'Added game history: {game} for user "{user_data["username"]}"'))

# 				except Stats.DoesNotExist:
# 					self.stdout.write(self.style.WARNING(f'Stats for user "{user_data["username"]}" do not exist, skipping'))

# 			except CustomUser.DoesNotExist:
# 				self.stdout.write(self.style.WARNING(f'User "{user_data["username"]}" does not exist, skipping'))

# 		self.stdout.write(self.style.SUCCESS('Successfully populated the database with predefined user data'))






from django.core.management.base import BaseCommand
from base.models import Stats, GameHistory
from api_user.models import CustomUser

class Command(BaseCommand):
	def handle(self, *args, **kwargs):
		predefined_data = [
			{
				'username': 'karl',
				'nb_of_victories': 2,
				'nb_of_defeats': 5,
				'games': [
					{'opponentUsername': 'clement', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-10'},
					{'opponentUsername': 'jess', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'clement', 'opponentScore': 10, 'myScore': 2, 'date': '2024-09-10'},
					{'opponentUsername': 'jess', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 4, 'date': '2024-09-11'},
					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 8, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 9, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'clement',
				'nb_of_victories': 3,
				'nb_of_defeats': 2,
				'games': [
					{'opponentUsername': 'AI', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 10, 'myScore': 6, 'date': '2024-09-11'},
					{'opponentUsername': 'jess', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'karl', 'opponentScore': 5, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'jess',
				'nb_of_victories': 2,
				'nb_of_defeats': 1,
				'games': [
					{'opponentUsername': 'clement', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'karl', 'opponentScore': 9, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'carolina', 'opponentScore': 10, 'myScore': 7, 'date': '2024-09-11'},
				]
			},
			{
				'username': 'carolina',
				'nb_of_victories': 10,
				'nb_of_defeats': 0,
				'games': [
					{'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'jess', 'opponentScore': 3, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'clement', 'opponentScore': 8, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'jess', 'opponentScore': 4, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'karl', 'opponentScore': 0, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'karl', 'opponentScore': 1, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'AI', 'opponentScore': 7, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'jess', 'opponentScore': 6, 'myScore': 10, 'date': '2024-09-11'},
					{'opponentUsername': 'clement', 'opponentScore': 5, 'myScore': 10, 'date': '2024-09-11'},
				]
			},
		]

		for user_data in predefined_data:
			try:
				# Check if the user exists in the CustomUser model
				user = CustomUser.objects.get(username=user_data['username'])
				self.stdout.write(self.style.SUCCESS(f'User "{user_data["username"]}" exists in the user database'))

				# Create or update the Stats entry in the dashboard database
				stats_entry, created = Stats.objects.update_or_create(
					username=user_data['username'],
					defaults={
						'nb_of_victories': user_data['nb_of_victories'],
						'nb_of_defeats': user_data['nb_of_defeats']
					}
				)

				if created:
					self.stdout.write(self.style.SUCCESS(f'Created new stats entry for "{user_data["username"]}"'))
				else:
					self.stdout.write(self.style.SUCCESS(f'Updated stats entry for "{user_data["username"]}"'))

				# Add game history
				for game in user_data['games']:
					GameHistory.objects.create(
						stats=stats_entry,
						opponentUsername=game['opponentUsername'],
						opponentScore=game['opponentScore'],
						myScore=game['myScore'],
						date=game['date']
					)
					self.stdout.write(self.style.SUCCESS(f'Added game history: {game} for user "{user_data["username"]}"'))

			except CustomUser.DoesNotExist:
				self.stdout.write(self.style.WARNING(f'User "{user_data["username"]}" does not exist in the user database, skipping'))

		self.stdout.write(self.style.SUCCESS('Successfully populated the dashboard database with predefined user data'))