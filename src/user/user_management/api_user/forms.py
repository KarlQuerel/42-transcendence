from django import forms
from .models import CustomUser
from django.contrib.auth.forms import UserCreationForm, SetPasswordForm


class CustomUserRegistrationForm(forms.ModelForm):

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email', 'date_of_birth', 'first_name', 'last_name', 'avatar']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if self.instance and self.instance.email == email:
            return email
        if CustomUser.objects.filter(email=email).exists():
            raise forms.ValidationError("Email already exists")
        return email

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if self.instance and self.instance.username == username:
            return username
        if CustomUser.objects.filter(username=username).exists():
            raise forms.ValidationError("Username already exists")
        return username

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user
