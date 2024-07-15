### Ajout pour API ###

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
   username = forms.CharField(required=True, max_length=12)

   class Meta:
      model = User
      fields = ('username', 'password1', 'password2')

### Ajout pour API ###