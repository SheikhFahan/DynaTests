from django.contrib import admin

from .models import Profile, TestScoresLibrary, AverageScore, TestMarksLibrary, CombinedTestScoresLibrary

admin.site.register(Profile)
admin.site.register(TestScoresLibrary)
admin.site.register(AverageScore)
admin.site.register(TestMarksLibrary)
admin.site.register(CombinedTestScoresLibrary)