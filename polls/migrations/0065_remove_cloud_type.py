# Generated by Django 3.1.6 on 2021-08-02 12:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0064_auto_20210802_1626'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cloud',
            name='type',
        ),
    ]