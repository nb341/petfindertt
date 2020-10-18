# Generated by Django 2.2.2 on 2020-10-12 18:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import posts.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0002_auto_20201011_1535'),
    ]

    operations = [
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to=posts.models.directory_path)),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MissingPets',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('atype', models.CharField(max_length=30)),
                ('breed', models.CharField(max_length=30)),
                ('desc', models.CharField(max_length=30)),
                ('lat', models.DecimalField(decimal_places=8, max_digits=10)),
                ('lng', models.DecimalField(decimal_places=8, max_digits=10)),
                ('post_time', models.DateTimeField(auto_now_add=True, verbose_name='datejoined')),
                ('translated_add', models.CharField(max_length=2400)),
                ('pic', models.ImageField(upload_to=posts.models.directory_path)),
                ('pics', models.ManyToManyField(to='posts.Images')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]