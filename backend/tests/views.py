from django.shortcuts import render 
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView     

from .models import (
    Test , EasyQuestion, MediumQuestion, Category,
    ChoiceForEasyQ, ChoiceForHardQ, ChoiceForMediumQ
)
from .serializers import (
    TestListCreateSerializer , EasyQuestionListSerializer, 
    MediumQuestionListSerializer, QuestionListSerializer,
    AnswerSubmissionSerializer
)
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

class SubmitAnswersAPIView(APIView):
    
    def post(self, request, *args, **kwargs):
        serializer = AnswerSubmissionSerializer(data = request.data, many = True)
        serializer.is_valid()
        # print(serializer.errors)
        validated_data = serializer.validated_data
        # print(validated_data)
        try:
            print("answers")
            for answer in validated_data:
                difficulty = answer['difficulty']
                choice_id = answer['answer_id']

                if(difficulty == 'easy'):
                    selected_choice = ChoiceForEasyQ.objects.get(pk = choice_id)
                    is_correct = selected_choice.is_correct
                    print(is_correct)
        except:
            return Response({'detail': 'Question or Choice does not exist'}, status=status.HTTP_404_NOT_FOUND)
        return Response(validated_data)
            
    
     
            



