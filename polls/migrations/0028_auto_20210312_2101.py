# Generated by Django 3.1.6 on 2021-03-12 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0027_my_channel_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='courses_profile',
            name='description',
            field=models.CharField(default='', max_length=400),
        ),
        migrations.AddField(
            model_name='courses_profile',
            name='name',
            field=models.CharField(default='', max_length=30),
        ),
    ]