from django.shortcuts import render 
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView     

from .models import (
    Test , EasyQuestion, MediumQuestion, Category,
    ChoiceForEasyQ, ChoiceForHardQ, ChoiceForMediumQ
)
from .serializers import (
    CategoryListCreateSerializer , EasyQuestionListSerializer, 
    MediumQuestionListSerializer, QuestionListSerializer,
    DifficultySerializer
)
# Create your views here.

class CategoriesListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListCreateSerializer


class QuestionsRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Test.objects.all()
    serializer_class =QuestionListSerializer

class EasyQuestionListAPIView(generics.ListAPIView):
    queryset = EasyQuestion.objects.all()
    serializer_class = EasyQuestionListSerializer


class MediumQuestionListAPIView(generics.ListAPIView):
    queryset = MediumQuestion.objects.all()
    serializer_class = MediumQuestionListSerializer

class SubmitAnswersAPIView(APIView):
    
    def post(self, request, *args, **kwargs):
        serializer = DifficultySerializer(data = request.data)

        if serializer.is_valid(raise_exception= True):
            validated_data = serializer.validated_data
        # print(validated_data)
        easy = validated_data['easy']
        medium = validated_data['medium']
        hard = validated_data['hard']
        print(hard)
        try:
            print("answers")
            for answer in easy:
                choice_id = answer['answer_id']
                selected_choice = ChoiceForEasyQ.objects.get(pk = choice_id)
                is_correct = selected_choice.is_correct
                print(is_correct)
            for answer in medium:
                choice_id = answer['answer_id']
                selected_choice = ChoiceForEasyQ.objects.get(pk = choice_id)
                is_correct = selected_choice.is_correct
                print(is_correct)
            for answer in hard:
                choice_id = answer['answer_id']
                selected_choice = ChoiceForEasyQ.objects.get(pk = choice_id)
                is_correct = selected_choice.is_correct
                print(is_correct)
        except:
            return Response({'detail': 'Question or Choice does not exist'}, status=status.HTTP_404_NOT_FOUND)
        return Response(validated_data)
            
    
     
            



