from django.contrib import admin

from .models import Profile, TestScoresLibrary, AverageScore

admin.site.register(Profile)
admin.site.register(TestScoresLibrary)
admin.site.register(AverageScore)
