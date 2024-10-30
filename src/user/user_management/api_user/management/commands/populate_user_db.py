from django.core.management.base import BaseCommand
from api_user.models import CustomUser

import os
from django.core.files import File
from django.core.files.base import ContentFile

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
			'avatar_path': '/app/media/avatars/karl.png'
		},
		{
			'username': 'clement',
			'password': 'pass123',
			'email': 'clément@email.com',
			'date_of_birth': '1997-01-28',
			'first_name': 'Clément',
			'last_name': 'Bernazeau',
			'avatar_path': '/app/media/avatars/clement.png'
		},
		{
			'username': 'carolina',
			'password': 'pass123',
			'email': 'carolina@email.com',
			'date_of_birth': '1997-07-04',
			'first_name': 'Carolina',
			'last_name': 'Somarriba',
			'avatar_path': '/app/media/avatars/carolina.png'
		},
		{
			'username': 'jess',
			'password': 'pass123',
			'email': 'jess@email.com',
			'date_of_birth': '1994-05-13',
			'first_name': 'Jessica',
			'last_name': 'Rouillon',
			'avatar_path': '/app/media/avatars/jess.png'
		},
		{
			'username': 'yako',
			'password': 'pass123',
			'email': 'yako@email.com',
			'date_of_birth': '2017-07-15',
			'first_name': 'Yako',
			'last_name': 'Baby',
		},
		{
			'username': 'cherry',
			'password': 'pass123',
			'email': 'cherry@email.com',
			'date_of_birth': '2016-07-15',
			'first_name': 'Cherry',
			'last_name': 'Pantoufle',
		},
		{
			'username': 'lebidou',
			'password': 'pass123',
			'email': 'lebidou@email.com',
			'date_of_birth': '2010-01-01',
			'first_name': 'Lebidou',
			'last_name': 'Onvoitplus',
		},
		{
			'username': 'jeanmichel',
			'password': 'pass123',
			'email': 'jeanmichel@email.com',
			'date_of_birth': '2013-01-01',
			'first_name': 'jean',
			'last_name': 'michel',
		},
	]

		# Iterate over predefined data and create entries in the database
		for user_data in predefined_data:
			if not CustomUser.objects.filter(username=user_data['username']).exists(): #to avoid adding twice the same user with fill_db
				user = CustomUser.objects.create_user(
					username=user_data['username'],
					password=user_data['password'],
					email=user_data['email'],
					date_of_birth=user_data['date_of_birth'],
					first_name=user_data['first_name'],
					last_name=user_data['last_name'],
					# avatar = '../../friends/' + user_data['username'] + '.png'
				)
				avatar_path = user_data['avatar_path']
				if os.path.exists(avatar_path):
					with open(avatar_path, 'rb') as avatar_file:
						user.avatar.save(os.path.basename(avatar_path), File(avatar_file), save=True)
				else:
					self.stdout.write(self.style.WARNING(f"Avatar file {avatar_path} does not exist"))

		self.stdout.write(self.style.SUCCESS('Successfully populated the user database'))

