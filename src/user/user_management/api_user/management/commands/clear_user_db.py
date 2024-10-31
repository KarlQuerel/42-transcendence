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
