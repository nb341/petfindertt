# Generated by Django 2.2.2 on 2020-09-28 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='certificates',
            field=models.FileField(default=None, upload_to='uploads/certificates/'),
        ),
    ]
