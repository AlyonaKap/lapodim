from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField

class AnimalType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Character(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Animal(models.Model):

    GENDER_CHOICES = [
        ('boy', 'Хлопчик'),
        ('girl', 'Дівчинка'),
    ]
    
    SIZE_CHOICES = [
        ('small', 'Малий (до 30 см)'),
        ('medium', 'Середній (30-50 см)'),
        ('large', 'Великий (50+ см)'),
    ]

    name = models.CharField(db_index=True, max_length=50)
    age = models.DateField()
    gender = models.CharField(max_length=25, choices=GENDER_CHOICES)
    size = models.CharField(max_length=25, choices=SIZE_CHOICES)

    description = models.TextField(null=True, blank=True)
    image = CloudinaryField('image', null=True, blank=True)
    is_adopted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    animal_type = models.ForeignKey(to=AnimalType, on_delete=models.PROTECT)

    characters = models.ManyToManyField(to=Character)

    def __str__(self):
        return self.name
    
class Adoption(models.Model):

    ADOPTION_STATUS = [
        ('pending', 'Відправлена'),
        ('approved', 'Схвалена'),
        ('rejected','Відхилена'),
        ]
    
    animal = models.ForeignKey(to=Animal, on_delete=models.CASCADE)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=25, choices = ADOPTION_STATUS, default='pending')
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.animal.name}"
    






    








    
