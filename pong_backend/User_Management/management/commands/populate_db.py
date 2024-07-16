from django.core.management.base import BaseCommand
from User_Management.models import UserProfile
from faker import Faker
import random

fake = Faker()

class Command(BaseCommand):
    help = 'Populates the database with random users'

    def handle(self, *args, **kwargs):
        for _ in range(10):
            user = UserProfile.objects.create(
                name=fake.user_name(),
                display_name=fake.name(),
                password=fake.password(),
                email=fake.email(),
                avatar=fake.image_url(),
                status=random.choice(['online', 'offline', 'away']),
                friends=random.sample(UserProfile.objects.all(), random.randint(0, 10)),
                friend_requests=random.sample(UserProfile.objects.all(), random.randint(0, 10)),
                pending=random.sample(UserProfile.objects.all(), random.randint(0, 10)),
                blocked=random.sample(UserProfile.objects.all(), random.randint(0, 10))
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database'))

#run "python manage.py populate_db" before "python manage.py runserver"

