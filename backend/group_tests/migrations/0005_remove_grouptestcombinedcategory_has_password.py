# Generated by Django 4.1 on 2024-01-07 15:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('group_tests', '0004_grouptestcategory_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='grouptestcombinedcategory',
            name='has_password',
        ),
    ]
