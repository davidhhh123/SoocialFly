# Generated by Django 3.1.6 on 2021-05-29 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0041_auto_20210529_1346'),
    ]

    operations = [
        migrations.AddField(
            model_name='ads_manager',
            name='file',
            field=models.FileField(null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='ads_manager',
            name='file_name',
            field=models.CharField(default='', max_length=50),
        ),
    ]
