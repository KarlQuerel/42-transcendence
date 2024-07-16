from django.core.management.base import BaseCommand
from User_Management.models import UserProfile

class Command(BaseCommand):
    help = 'Deletes all users and their associated stats'

    def handle(self, *args, **kwargs):
        # Delete all users
        UserProfile.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Successfully deleted all users'))


#run "python manage.py clear_db" before "python manage.py runserver"
