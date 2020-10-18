from django.db import models
from django.conf import settings
# Create your models here.
def directory_path(instance, filename):
        # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
        return 'users/{0}/missing_pets/{1}'.format(instance.user_id, filename)
def directory_path2(instance, filename):
        # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
        return 'users/{0}/missing_pets/{1}'.format(instance.user_id, filename)
class Images(models.Model):
    img = models.ImageField(upload_to=directory_path)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    missing_pets_id = models.ForeignKey('MissingPets', on_delete=models.CASCADE,null=True)
    

class MissingPets(models.Model):
    name = models.CharField(max_length=30)
    atype = models.CharField(max_length=30)
    breed = models.CharField(max_length=30)
    desc = models.CharField(max_length=30)
    lat = models.DecimalField(max_digits=10, decimal_places=8)
    lng = models.DecimalField(max_digits=10, decimal_places=8)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post_time = models.DateTimeField(verbose_name='datejoined',auto_now_add=True)
    translated_add = models.CharField(max_length=2400)
    pic = models.ImageField(upload_to=directory_path2)
    pics = models.ManyToManyField(Images)
    

