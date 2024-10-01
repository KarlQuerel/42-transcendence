from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.core.files import File
from django.conf import settings
import os


class CustomUser(AbstractUser):
    username = models.CharField(blank=False, null=False, max_length=12, unique=True)
    email = models.EmailField(blank=False, null=False, unique=True)
    date_of_birth = models.DateField(blank=True, null=True)
    friends = models.ManyToManyField("CustomUser", blank=True)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png')
    # pour lier avec dashboard
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username



# @receiver(pre_save, sender=CustomUser)
# def set_default_avatar(sender, instance, **kwargs):
# 	if not instance.avatar:
# 		default_avatar_path = os.path.join(settings.API_DIR, 'static', 'avatars', 'default.png')
# 		with open(default_avatar_path, 'rb') as f:
# 			default_avatar = File(f)
# 			instance.avatar.save('default.png', default_avatar, save=False)
