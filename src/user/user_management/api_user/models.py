from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.core.files import File
from django.conf import settings
import pyotp


class CustomUser(AbstractUser):
    username = models.CharField(blank=False, null=False, max_length=12, unique=True)
    email = models.EmailField(blank=False, null=False, unique=True)
    date_of_birth = models.DateField(blank=True, null=True)
    friends = models.ManyToManyField("CustomUser", blank=True)
    is2fa = models.BooleanField(default=False)
    totp_secret = models.CharField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True, default='avatars/default.png')
    # pour lier avec dashboard
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username


# @receiver(pre_save, sender=CustomUser)
# def setDefaultAvatar(sender, instance, **kwargs):
# 	if not instance.avatar and not instance.pk:
# 		default_avatar_path = os.path.join(settings.MEDIA_ROOT, 'avatars', 'default.png')
# 		with open(default_avatar_path, 'rb') as f:
# 			instance.avatar.save('default.png', File(f), save=False)
