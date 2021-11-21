# Generated by Django 3.1.6 on 2021-03-09 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0023_auto_20210309_0109'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playlist',
            name='song',
        ),
        migrations.AddField(
            model_name='playlist_init',
            name='song',
            field=models.ManyToManyField(related_name='songs', to='polls.Song'),
        ),
    ]
