from django import forms
from .models import CustomUser
from django.contrib.auth.forms import UserCreationForm, SetPasswordForm

class CustomUserRegistrationForm(forms.ModelForm):

    class Meta:
        model = CustomUser
        fields = ['username', 'password1', 'password2', 'email', 'date_of_birth', 'first_name', 'last_name']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            raise forms.ValidationError("Email already exists")
        return email

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if CustomUser.objects.filter(username=username).exists():
            raise forms.ValidationError("Username already exists")
        return username

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


# class CustomUserChangePasswordForm(SetPasswordForm):

#     class Meta(SetPasswordForm.Meta):
#         model = CustomUser
#         fields = ['old_password', 'new_password1', 'new_password2']



    # def clean_password(self):
    #     password = self.cleaned_data.get('password')
    #     # Ajouter des validations supplémentaires ici si nécessaire
    #     return password