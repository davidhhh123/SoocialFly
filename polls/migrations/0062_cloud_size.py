# Generated by Django 3.1.6 on 2021-07-31 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0061_auto_20210722_2109'),
    ]

    operations = [
        migrations.AddField(
            model_name='cloud',
            name='size',
            field=models.IntegerField(default=0),
        ),
    ]
