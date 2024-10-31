from django.core.management.base import BaseCommand
from api_user.models import CustomUser
from friends.models import FriendRequest

class Command(BaseCommand):
	help = 'Deletes all users'

	def handle(self, *args, **kwargs):
		# Delete all friend requests
		FriendRequest.objects.all().delete()
		# Delete all user
		CustomUser.objects.all().delete()

		self.stdout.write(self.style.SUCCESS('Successfully deleted all users'))


# # run "python manage.py clear_db" before "python manage.py runserver"


#IMPORTANT: MESSAGE POUR JESS DE CARO: ce fichier ne sert plus à rien.#Je supprime les deux bases 
# de donnnées en même temps dans le makefile car si tu supprimes les users sans avoir supprimé avant
# les gameHistory, ils se perdent dans la matrice. Donc ej supprime tout dans un fichier de mon côté.