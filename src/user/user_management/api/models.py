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
    password1 = models.CharField(blank=False, null=False, max_length=30, default='default_password')
    password2 = models.CharField(blank=False, null=False, max_length=30, default='default_password')
    friends = models.ManyToManyField("CustomUser", blank=True)
    # Override AbstractUser existing fields
    groups = None
    user_permissions = None


    # groups = models.ManyToManyField(
    #     'auth.Group',
    #     related_name='customuser_set',
    #     blank=True,
    #     help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    #     verbose_name='groups'
    # )
    # user_permissions = models.ManyToManyField(
    #     'auth.Permission',
    #     related_name='customuser_set',
    #     blank=True,
    #     help_text='Specific permissions for this user.',
    #     verbose_name='user permissions'
    # )



# @receiver(pre_save, sender=CustomUser)
# def set_default_avatar(sender, instance, **kwargs):
# 	if not instance.avatar:
# 		default_avatar_path = os.path.join(settings.API_DIR, 'static', 'avatars', 'default.png')
# 		with open(default_avatar_path, 'rb') as f:
# 			default_avatar = File(f)
# 			var = instance.avatar.save('default.png', default_avatar, save=False)
