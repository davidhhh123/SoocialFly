# Generated by Django 3.1.6 on 2021-02-23 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0005_cloud'),
    ]

    operations = [
        migrations.AddField(
            model_name='cloud',
            name='times',
            field=models.DateTimeField(null=True),
        ),
    ]
