# Generated by Django 3.1.6 on 2021-02-28 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0013_remove_song_genre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='thumbnail',
            field=models.ImageField(default='', upload_to='thumbnails'),
        ),
    ]