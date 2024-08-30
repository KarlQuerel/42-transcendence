from django import forms
from .models import CustomUser

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    # confirm_password = forms.CharField(widget=forms.PasswordInput, label='Confirm Password')

    class Meta:
        model = CustomUser
        fields = ['password',
                #   'confirm_password',
                  'username',]

    def clean_password(self):
        password = self.cleaned_data.get('password')
        # Ajouter des validations supplémentaires ici si nécessaire
        return password