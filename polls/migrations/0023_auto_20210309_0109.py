# Generated by Django 3.1.6 on 2021-03-08 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0022_playlist_init_defoult_playlist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist_init',
            name='poster',
            field=models.FileField(default='now', upload_to=''),
        ),
    ]
