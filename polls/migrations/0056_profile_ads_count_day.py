# Generated by Django 3.1.6 on 2021-07-14 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0055_remove_category_choeses_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='ads_count_day',
            field=models.PositiveIntegerField(default=10),
        ),
    ]
