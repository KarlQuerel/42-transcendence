# Generated by Django 4.2.16 on 2024-10-30 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_user', '0019_merge_20241025_1513'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
