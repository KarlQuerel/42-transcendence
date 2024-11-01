from rest_framework import serializers
from api_user.models import CustomUser
from api_user.forms import CustomUserRegistrationForm
from django.core.exceptions import ValidationError

class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username']



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'date_of_birth', 'first_name', 'last_name', 'avatar']

    def validate(self, attrs):
        form = CustomUserRegistrationForm(attrs)
        form.full_clean()
        return attrs

    def save(self, **kwargs):
        form = CustomUserRegistrationForm(self.validated_data)
        form.save(**kwargs)
        return form.instance

    def validate_avatar(self, value):
        if value:
            if not self.instance.avatar or self.instance.avatar != value:
                # Check if the file is too large
                max_size = 1024 * 1024  # 1MB limit
                if value.size > max_size:
                    raise ValidationError("Avatar exceeds the maximum size of 1MB")
        return value