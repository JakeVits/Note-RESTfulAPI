from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

class Profile(models.Model):
    GENDER = [('male', 'Male'), ('female', 'Female')]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=6, choices=GENDER)
    nationality = models.CharField(max_length=20)
    occupation = models.CharField(max_length=20)
    yoe = models.PositiveIntegerField(default=0) # year of experience

    def __str__(self):
        return f'{self.user}'

@receiver(post_save, sender=User)
def set_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


class Note(models.Model):
    owner = models.ForeignKey(User, models.CASCADE)
    title = models.CharField(max_length=20, unique=True)
    content = models.TextField(blank=True)
    c_date = models.DateTimeField(auto_now_add=True)
    u_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

