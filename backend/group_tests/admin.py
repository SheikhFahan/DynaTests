from django.contrib import admin

# Register your models here.
from .models import (
    GroupTest, GroupTestCategory, EasyQuestion, 
    MediumQuestion, HardQuestion, ChoiceForEasyQ,
    ChoiceForMediumQ, ChoiceForHardQ, GroupTestCombinedCategory,
    TestPassword
)

admin.site.register(GroupTest)
admin.site.register(GroupTestCategory)
admin.site.register(EasyQuestion)
admin.site.register(MediumQuestion)
admin.site.register(HardQuestion)
admin.site.register(ChoiceForEasyQ)
admin.site.register(ChoiceForMediumQ)
admin.site.register(ChoiceForHardQ)
admin.site.register(GroupTestCombinedCategory)
admin.site.register(TestPassword)

