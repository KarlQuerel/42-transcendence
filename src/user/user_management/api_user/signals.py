from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django_celery_beat.models import PeriodicTask, IntervalSchedule

@receiver(post_migrate)
def createPeriodicTasks(sender, **kwargs):

    schedule, created = IntervalSchedule.objects.get_or_create(every=1, period=IntervalSchedule.DAYS)
    PeriodicTask.objects.get_or_create(
        interval=schedule,
        name='Delete inactive users and send warning emails',
        task='user_management_database.tasks.delete_inactive_users',
    )