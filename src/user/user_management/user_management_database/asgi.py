"""
ASGI config for user_management project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import user_management_database.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'user_management_database.settings')

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": AuthMiddlewareStack(
      URLRouter(
          user_management_database.routing.websocket_urlpatterns
      )
  ),
})