### Ajout pour API ###

from django.urls import path
from .views import register

urlpatterns = [
    path('register/', register, name='register'),
]

### Ajout pour API ###