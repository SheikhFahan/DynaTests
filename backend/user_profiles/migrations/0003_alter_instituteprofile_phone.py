# Generated by Django 4.1 on 2024-01-06 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profiles', '0002_instituteprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instituteprofile',
            name='phone',
            field=models.IntegerField(),
        ),
    ]