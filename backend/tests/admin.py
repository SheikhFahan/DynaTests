from django.contrib import admin

# Register your models here.
from .models import Test, Category, Choice, Question

admin.site.register(Test)
admin.site.register(Category)
admin.site.register(Choice)
admin.site.register(Question)