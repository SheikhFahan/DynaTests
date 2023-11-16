from django.urls import path
from .views import TestCreateAPIView, EasyQuestionListAPIView, MediumQuestionListAPIView
urlpatterns = [
    path('list/', TestCreateAPIView.as_view() ),
    path('eqs/', EasyQuestionListAPIView.as_view()),
    path('mqs/', MediumQuestionListAPIView.as_view()),

]