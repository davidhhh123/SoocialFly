# Generated by Django 3.1.6 on 2021-07-14 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0056_profile_ads_count_day'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='ads_count_day_q',
            field=models.PositiveIntegerField(default=0),
        ),
    ]