# Generated by Django 3.1.6 on 2021-08-03 13:06

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0065_remove_cloud_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='cloud_size_my_profile',
            field=models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
