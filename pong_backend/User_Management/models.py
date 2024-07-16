from django.db import models

# Create your models here.

class UserProfile(models.Model):
    username = models.CharField(max_length=12)
    display_name = models.CharField(max_length=12)
    password = models.CharField(max_length=30)
    email = models.EmailField(necessary=True)
    avatar = models.ImageField(upload_to='avatars/')
    status = models.CharField(max_length=20)
    friends = models.ManyToManyField('self')
    friend_requests = models.ManyToManyField('self')
    pending = models.ManyToManyField('self')
    blocked = models.ManyToManyField('self')
