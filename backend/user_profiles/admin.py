from django.contrib import admin

from .models import Profile, TestScoresLibrary, AverageScore, TestMarksLibrary, CombinedTestScoresLibrary
from .user_group_models import  GroupTestScoresLibrary, GroupTestAverageScore, GroupTestMarksLibrary, CombinedGroupTestScoresLibrary,  InstituteProfile


admin.site.register(Profile)
admin.site.register(TestScoresLibrary)
admin.site.register(AverageScore)
admin.site.register(TestMarksLibrary)
admin.site.register(CombinedTestScoresLibrary)
admin.site.register(GroupTestScoresLibrary)
admin.site.register(GroupTestAverageScore)
admin.site.register(GroupTestMarksLibrary)
admin.site.register(CombinedGroupTestScoresLibrary)
admin.site.register(InstituteProfile)
