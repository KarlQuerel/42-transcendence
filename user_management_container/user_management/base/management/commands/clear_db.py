from django.core.management.base import BaseCommand
from base.models import User


class Command(BaseCommand):
    help = 'Deletes all users'

    def handle(self, *args, **kwargs):
        # Delete all user
        User.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Successfully deleted all users'))


#run "python manage.py clear_db" before "python manage.py runserver"
