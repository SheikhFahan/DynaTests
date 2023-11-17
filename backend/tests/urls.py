from django.urls import path
from .views import TestListAPIView, EasyQuestionListAPIView, MediumQuestionListAPIView, TestRetrieveAPIView
urlpatterns = [
    path('list/',TestListAPIView.as_view() ),
    path('<int:pk>/get_test/',TestRetrieveAPIView.as_view()),
    path('eqs/', EasyQuestionListAPIView.as_view()),
    path('mqs/', MediumQuestionListAPIView.as_view()),

]