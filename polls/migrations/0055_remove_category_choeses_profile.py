# Generated by Django 3.1.6 on 2021-07-02 11:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0054_auto_20210628_2343'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category_choeses',
            name='profile',
        ),
    ]
