# Generated by Django 3.1.6 on 2021-03-06 18:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0017_profile_likes_count_pr'),
    ]

    operations = [
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='playlist_post_profile', to='polls.profile')),
                ('song', models.ManyToManyField(related_name='songs', to='polls.Song')),
            ],
        ),
    ]
