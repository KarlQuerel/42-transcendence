# Generated by Django 4.2.16 on 2024-10-14 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_user', '0011_alter_customuser_is2fa'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='is2fa',
            field=models.BooleanField(default=False),
        ),
    ]