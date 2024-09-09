from django import forms
from .models import CustomUser
from django.contrib.auth.forms import UserCreationForm, SetPasswordForm

class CustomUserRegistrationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ['username', 'password', 'email', 'date_of_birth', 'first_name', 'last_name']



class CustomUserChangePasswordForm(SetPasswordForm):

    class Meta(SetPasswordForm.Meta):
        model = CustomUser
        fields = ['old_password', 'new_password1', 'new_password2']



    # def clean_password(self):
    #     password = self.cleaned_data.get('password')
    #     # Ajouter des validations supplémentaires ici si nécessaire
    #     return password