# Generated by Django 4.1 on 2023-12-25 08:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0001_initial'),
        ('user_profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='averagescore',
            unique_together={('category', 'profile')},
        ),
    ]
