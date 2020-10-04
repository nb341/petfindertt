from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")
    
        user = self.model(
                    email = self.normalize_email(email),
                    username = username,
                )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self , email, username, password):
        user = self.create_user(
        email = self.normalize_email(email),
                password=password,
                username=username,
            )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

def user_directory_path(self, filename):
        # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
        return 'user/pro-pic/{0}/{1}'.format(self.id, filename)
def user_certs(self, filename):
        # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
        return 'user/certificates/{0}/{1}'.format(self.id, filename)
class User(AbstractBaseUser):
    
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='datejoined',auto_now_add=True)
    last_login= models.DateTimeField(verbose_name="lastlogin", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_pet_owner = models.BooleanField(default=False)
    is_vet = models.BooleanField(default=False)
    is_rescuer = models.BooleanField(default=False)
    is_volunteer = models.BooleanField(default=False)
    is_rescuer = models.BooleanField(default=False)
    pro_pic = models.ImageField(upload_to=user_directory_path)
    certificates = models.FileField(upload_to=user_certs,default=None)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    objects = MyUserManager()

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
    





