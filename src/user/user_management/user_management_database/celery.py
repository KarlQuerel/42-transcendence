from __future__ import absolute_import, unicode_literals
from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'user_management_database.settings')

app = Celery('user_management')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()