# Generated by Django 2.2.2 on 2020-10-12 18:59

from django.db import migrations, models
import posts.models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_images_pid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='images',
            old_name='pid',
            new_name='p_id',
        ),
        migrations.AlterField(
            model_name='missingpets',
            name='pic',
            field=models.ImageField(upload_to=posts.models.directory_path2),
        ),
    ]