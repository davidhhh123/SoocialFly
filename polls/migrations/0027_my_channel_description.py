# Generated by Django 3.1.6 on 2021-03-11 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0026_auto_20210311_1939'),
    ]

    operations = [
        migrations.AddField(
            model_name='my_channel',
            name='description',
            field=models.CharField(default='', max_length=400),
        ),
    ]
