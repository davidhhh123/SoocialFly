# Generated by Django 3.1.6 on 2021-03-22 16:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0030_my_channel_main_poster'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pr_time',
            old_name='time_post',
            new_name='times',
        ),
    ]
