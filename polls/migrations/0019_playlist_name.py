# Generated by Django 3.1.6 on 2021-03-06 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0018_playlist'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='name',
            field=models.CharField(default='', max_length=20),
        ),
    ]
