from django.shortcuts import render
from rest_framework import generics
from .models import Test , EasyQuestion, MediumQuestion, Category
from .serializers import TestListCreateSerializer , EasyQuestionListSerializer, MediumQuestionListSerializer, QuestionListSerializer
# Create your views here.

class TestListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = TestListCreateSerializer

class QuestionsRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Test.objects.all()
    serializer_class =QuestionListSerializer

class EasyQuestionListAPIView(generics.ListAPIView):
    queryset = EasyQuestion.objects.all()
    serializer_class = EasyQuestionListSerializer


class MediumQuestionListAPIView(generics.ListAPIView):
    queryset = MediumQuestion.objects.all()
    serializer_class = MediumQuestionListSerializer


