# Generated by Django 3.1.6 on 2021-03-26 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0033_pr_time_pr_images_times'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pr_time_pr_images',
            name='times',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
