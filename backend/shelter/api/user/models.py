from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class UserManager(BaseUserManager):
    def create_user(self, name, surname, email, password=None, **kwargs):

        if name is None:
            raise TypeError("Users must have a name")
        if surname is None:
            raise TypeError("Users must have a surname")
        if email is None:
            raise TypeError("Users must have an email")

        user = self.model(name=name, surname=surname, email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, name, surname, email, password):

        if password is None:
            raise TypeError("Superusers must have a password")
        if email is None:
            raise TypeError("Superusers must have an email")
        if name is None:
            raise TypeError("Superusers must have a name")
        if surname is None:
            raise TypeError("Superusers must have a surname")

        user = self.create_user(name, surname, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(db_index=True, max_length=255)
    surname = models.CharField(max_length=100)

    email = models.EmailField(db_index=True, max_length=256, unique=True)
    phone = models.CharField(max_length=15, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "surname"]

    objects = UserManager()

    def __str__(self):
        return self.email

# class UserLike(models.Model):
#     pk = models.CompositePrimaryKey("user_id", "animal_id")
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     animal = models.ForeignKey(Animal, on_delete=models.CASCADE)

#     created_at = models.DateTimeField(auto_now_add=True)