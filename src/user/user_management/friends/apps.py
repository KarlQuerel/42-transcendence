from django.apps import AppConfig


class FriendsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'friends'

default_app_config = 'friends.apps.FriendsConfig'