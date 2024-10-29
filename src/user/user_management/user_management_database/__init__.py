from __future__ import absolute_import, unicode_literals
from .celery import app as celery_app
from user_management_database.celery import app as celery_app

__all__ = ('celery_app',)