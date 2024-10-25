from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api_user'

    def ready(self):
        import api_user.signals
        from . import signals