from django.contrib import admin

from .models import Profile, TestScoresLibrary, AverageScores

admin.site.register(Profile)
admin.site.register(TestScoresLibrary)
admin.site.register(AverageScores)
