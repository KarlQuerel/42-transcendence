from django.db import models

# class Item(models.Model): #HERE
# 	name = models.CharField(max_length=200)
# 	created = models.DateTimeField(auto_now_add=True)


class User(models.Model):
    username = models.CharField(blank=False, null=False, max_length=12)
    display_name = models.CharField(max_length=12)
    password = models.CharField(blank=False, null=False, max_length=30)
    email = models.EmailField(blank=False, null=False)
    # avatar = models.ImageField(upload_to='avatars/')
    online = models.BooleanField(default=True)
    friends = models.ManyToManyField('self')