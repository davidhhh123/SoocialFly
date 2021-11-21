# Generated by Django 3.1.6 on 2021-08-16 10:51

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0073_books_status_x'),
    ]

    operations = [
        migrations.AddField(
            model_name='books',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created_At'),
        ),
    ]
