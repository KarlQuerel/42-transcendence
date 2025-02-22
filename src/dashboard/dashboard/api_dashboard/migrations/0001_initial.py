# Generated by Django 4.2.16 on 2024-10-26 16:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='GameHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('myUsername', models.CharField(default='default_username', max_length=200)),
                ('opponentUsername', models.CharField(max_length=200)),
                ('opponentScore', models.IntegerField()),
                ('myScore', models.IntegerField()),
                ('date', models.DateTimeField(blank=True, null=True)),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='games_history', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
