# Generated by Django 4.2.16 on 2024-10-14 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_user', '0013_customuser_is_online'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='is_online',
            field=models.BooleanField(default=True),
        ),
    ]
