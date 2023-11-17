from django.shortcuts import render
from rest_framework import generics
from .models import Test , EasyQuestion, MediumQuestion
from .serializers import TestListSerializer , EasyQuestionListSerializer, MediumQuestionListSerializer
# Create your views here.

class TestListAPIView(generics.ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestListSerializer

class TestRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Test.objects.all()
    serializer_class = TestListSerializer

class EasyQuestionListAPIView(generics.ListAPIView):
    queryset = EasyQuestion.objects.all()
    serializer_class = EasyQuestionListSerializer


class MediumQuestionListAPIView(generics.ListAPIView):
    queryset = MediumQuestion.objects.all()
    serializer_class = MediumQuestionListSerializer


