# Generated by Django 3.1.6 on 2021-07-15 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0057_profile_ads_count_day_q'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile_images',
            name='monetization_boole',
            field=models.BooleanField(default=False),
        ),
    ]
