# Generated by Django 3.1.6 on 2021-04-14 18:35

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0036_arts_profile_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='lavel_dr_s',
            field=models.FloatField(default='0', validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
