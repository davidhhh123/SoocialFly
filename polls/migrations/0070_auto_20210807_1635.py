# Generated by Django 3.1.6 on 2021-08-07 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0069_auto_20210807_1633'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song_res',
            name='status_x',
            field=models.CharField(default='False', max_length=6),
        ),
    ]
