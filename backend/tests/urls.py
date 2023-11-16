from django.urls import path
from .views import TestListAPIView, EasyQuestionListAPIView, MediumQuestionListAPIView
urlpatterns = [
    path('list/', TestListAPIView.as_view() ),
    path('eqs/', EasyQuestionListAPIView.as_view()),
    path('mqs/', MediumQuestionListAPIView.as_view()),

]