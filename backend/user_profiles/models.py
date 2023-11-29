from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='auth_user')
    name = models.CharField(max_length= 100, null= True)
    email = models.EmailField(max_length= 30)
    phone = models.CharField(max_length=13, blank= False)

    def __str__(self):
        if self.name :
            return self.name
        return 'learn to code first'

class ExperiencePoints(models.Model):
    title = models.CharField(max_length=30)
    experience_points = models.IntegerField(default= 0)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name= 'profile')

