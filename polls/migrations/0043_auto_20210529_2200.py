# Generated by Django 3.1.6 on 2021-05-29 18:00

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0042_auto_20210529_2158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ads_manager',
            name='price',
            field=models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]