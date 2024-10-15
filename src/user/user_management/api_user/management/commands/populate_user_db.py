from django.core.management.base import BaseCommand
from api_user.models import CustomUser

#********************************************
#			ADD MANUALLY ENTERED USERS		#
#********************************************

# TODO - change password before push
class Command(BaseCommand):
	def handle(self, *args, **kwargs):
		predefined_data = [
		{
			'username': 'karl',
			'password': 'pass123',
			'email': 'karl@email.com',
			'date_of_birth': '1992-09-29',
			'first_name': 'Karl',
			'last_name': 'Querel',
		},
		{
			'username': 'clement',
			'password': 'pass123',
			'email': 'clément@email.com',
			'date_of_birth': '1997-01-28',
			'first_name': 'Clément',
			'last_name': 'Bernazeau',
		},
		{
			'username': 'carolina',
			'password': 'pass123',
			'email': 'carolina@email.com',
			'date_of_birth': '1997-07-04',
			'first_name': 'Carolina',
			'last_name': 'Somarriba',
		},
		{
			'username': 'jess',
			'password': 'pass123',
			'email': 'jess@email.com',
			'date_of_birth': '1994-05-13',
			'first_name': 'Jessica',
			'last_name': 'Rouillon',
		},
	]

		# Iterate over predefined data and create entries in the database
		for user_data in predefined_data:
			user = CustomUser.objects.create_user(
				username=user_data['username'],
				password=user_data['password'],
				email=user_data['email'],
				date_of_birth=user_data['date_of_birth'],
				first_name=user_data['first_name'],
				last_name=user_data['last_name'],
			)

# TEST CARO pour fix make fill : permet aussi d'éviter les erreurs si on "make fill" deux fois de suite"
# 		Create entries in the database if the user doesn't exist yet
		# for user_data in predefined_data:
		# 	if not CustomUser.objects.filter(username=user_data['username']).exists():
		# 		CustomUser.objects.create_user(
		# 			username=user_data['username'],
		# 			password=user_data['password'],
		# 			email=user_data['email'],
		# 			date_of_birth=user_data['date_of_birth'],
		# 			first_name=user_data['first_name'],
		# 			last_name=user_data['last_name'],
		# 		)
		# 		self.stdout.write(self.style.SUCCESS(f'Successfully created user "{user_data["username"]}"'))
		# 	else:
		# 		self.stdout.write(self.style.WARNING(f'User "{user_data["username"]}" already exists'))


		self.stdout.write(self.style.SUCCESS('Successfully populated the user database'))