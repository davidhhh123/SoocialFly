# Generated by Django 3.1.6 on 2021-06-28 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0051_invite_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invite_users',
            name='user',
            field=models.CharField(max_length=50),
        ),
    ]
