# Generated by Django 2.2.2 on 2020-10-09 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20201007_1913'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedfile',
            name='file',
            field=models.FileField(upload_to='certificates'),
        ),
    ]