# Generated by Django 3.1.6 on 2021-04-02 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0034_auto_20210326_1931'),
    ]

    operations = [
        migrations.AddField(
            model_name='arts',
            name='profile_image',
            field=models.FileField(default='', upload_to=''),
        ),
    ]
