from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    username = models.CharField(blank=False, null=False, max_length=12, unique=True)
    email = models.EmailField(blank=False, null=False, unique=True)
    date_of_birth = models.DateField(blank=True, null=True)
    friends = models.ManyToManyField("CustomUser", blank=True)
    is2fa = models.BooleanField(default=False)
    totp_secret = models.CharField(blank=True, null=True)
    is_online = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True, default='avatars/default.png')
    isAnonymous = models.BooleanField(default=False)
    # pour lier avec dashboard
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
