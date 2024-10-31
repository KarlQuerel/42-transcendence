from django.core.management.base import BaseCommand
from api_dashboard.models import GameHistory
from django.db import connection

class Command(BaseCommand):
	help = 'Deletes all users and their game history from both user and dashboard databases'

	def handle(self, *args, **kwargs):
		# Delete all game history
		GameHistory.objects.all().delete()

		# Reset user_id column to 1
		with connection.cursor() as cursor:
			cursor.execute("ALTER SEQUENCE api_user_customuser_id_seq RESTART WITH 1;")
			cursor.execute("ALTER SEQUENCE api_dashboard_gamehistory_id_seq RESTART WITH 1;")
		
		self.stdout.write(self.style.SUCCESS('Successfully deleted all users and game history'))


