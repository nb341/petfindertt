# Generated by Django 2.2.2 on 2020-10-13 11:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_auto_20201013_0717'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='images',
            name='missing_pets_id',
        ),
    ]
