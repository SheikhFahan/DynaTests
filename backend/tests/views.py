from django.shortcuts import render 
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView     
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework import permissions

from django.contrib.auth.models import User

from user_profiles.models import Profile, AverageScores, TestScoresLibrary

from .models import (
    Test , EasyQuestion, MediumQuestion, Category,
    ChoiceForEasyQ, ChoiceForHardQ, ChoiceForMediumQ, HardQuestion
)
from .serializers import (
    CategoryListCreateSerializer , EasyQuestionListSerializer, 
    MediumQuestionListSerializer, QuestionListSerializer,
    DifficultySerializer, CategoryListCreateSerializer,QuestionSerializer
)
# Create your views here.

class CategoriesListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListCreateSerializer


class QuestionsRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Test.objects.all()
    serializer_class =QuestionListSerializer

class BetaQuestionsRetrieveAPIView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    lookup_field = 'category'

    def get_queryset(self):
        category = self.request.query_params.get('category')

        # Validate category or set a default value if needed
        # For example, setting category to 1 if not provided
        category = int(category) if category.isdigit() else 1

        # Filter questions based on the category
        easy_questions = EasyQuestion.objects.filter(category=category)[:2]
        medium_questions = MediumQuestion.objects.filter(category=category)[:2]
        hard_questions = HardQuestion.objects.filter(category=category)[:2]

        combined_queryset = list(easy_questions) + list(medium_questions) + list(hard_questions)
        return combined_queryset


class EasyQuestionListAPIView(generics.ListAPIView):
    queryset = EasyQuestion.objects.all()
    serializer_class = EasyQuestionListSerializer


class MediumQuestionListAPIView(generics.ListAPIView):
    queryset = MediumQuestion.objects.all()
    serializer_class = MediumQuestionListSerializer

class SubmitAnswersAPIView(APIView):
    # dependencies (category, questions, number of questions)
    # check for answers, update the avg score, update the score
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        serializer = DifficultySerializer(data = request.data)

        if serializer.is_valid(raise_exception= True):
            validated_data = serializer.validated_data
        # print(validated_data)
        easy = validated_data['easy']
        medium = validated_data['medium']
        hard = validated_data['hard']
        profile = Profile.objects.get(name= request.user)
        print(profile)

        score =0
        try:
            for answer in easy:
                choice_id = answer['answer_id']
                selected_choice = ChoiceForEasyQ.objects.get(pk = choice_id)
                is_correct = selected_choice.is_correct
                if is_correct:
                    score+= 5

            for answer in medium:
                choice_id = answer['answer_id']
                selected_choice = ChoiceForEasyQ.objects.get(pk = choice_id)
                is_correct = selected_choice.is_correct
                if is_correct:
                    score+=7
            
            for answer in hard:
                choice_id = answer['answer_id']
                selected_choice = ChoiceForEasyQ.objects.get(pk = choice_id)
                is_correct = selected_choice.is_correct
                if is_correct:
                    score+=10
            # test_lib = TestScoresLibrary.objects.create(profile = profile, score = score, category =  )
            
            print(score)
            print()
        except:
            return Response({'detail': 'Question or Choice does not exist'}, status=status.HTTP_404_NOT_FOUND)

    
        return Response(validated_data)
            
    
     
            



