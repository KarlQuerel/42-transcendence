from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from api_user.models import CustomUser

class Command(BaseCommand):
	def handle(self, *args, **kwargs):
		self.stdout.write("Vérification de statut des utilisateurs inactifs effectuée.")
		offline_threshold = timezone.now() - timedelta(seconds=60)
		with open("/tmp/check_user_status.log", "a") as log_file:
			log_file.write("check_user_status exécutée.\n")
		CustomUser.objects.filter(last_ping__lt=offline_threshold, is_online=True).update(is_online=False)
