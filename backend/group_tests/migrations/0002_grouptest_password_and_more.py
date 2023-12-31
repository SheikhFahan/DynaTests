# Generated by Django 4.1 on 2023-12-26 09:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('group_tests', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='grouptest',
            name='password',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='grouptestcombinedcategory',
            name='password',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='TestPassword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=100)),
                ('test', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='password_info', to='group_tests.grouptest')),
            ],
        ),
        migrations.CreateModel(
            name='GroupTestPassword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=100)),
                ('test', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='password_info', to='group_tests.grouptestcombinedcategory')),
            ],
        ),
    ]
