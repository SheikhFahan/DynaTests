from django.shortcuts import render 
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView     
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework import permissions

import json

from django.contrib.auth.models import User

from user_profiles.models import Profile, AverageScores, TestScoresLibrary

from .models import (
    Test , EasyQuestion, MediumQuestion, Category,
    ChoiceForEasyQ, ChoiceForHardQ, ChoiceForMediumQ, HardQuestion
)
from .serializers import (
    CategoryListCreateSerializer, SubmitAnswersSerializer,
      CategoryListCreateSerializer, QuestionSerializer
)
# Create your views here.

class CategoriesListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListCreateSerializer

class QuestionsRetrieveAPIView(generics.ListAPIView):

    serializer_class = QuestionSerializer

    def get_queryset(self):
        # category of the test
        category = self.kwargs['category']

        easy_questions = EasyQuestion.objects.filter(category=category)[:1]
        medium_questions = MediumQuestion.objects.filter(category=category)[:1]
        hard_questions = HardQuestion.objects.filter(category=category)[:1]

        questions_dict = {
        'easy_questions': easy_questions,
        'medium_questions': medium_questions,
        'hard_questions': hard_questions,
    }
        
        return questions_dict
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        instance = {'questions' : queryset}
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class SubmitAnswersAPIView(APIView):
    # dependencies (category, questions, number of questions)
    # check for answers, update the avg score, update the score

    permission_classes = [permissions.IsAuthenticated]
    
    # change this as a dynamic field depending on the actual test
    total_questions = 25
    scoring = {
        'easy': 5,
        'medium' : 7,
        'hard' : 10
    }

    def get_category(self, easy_questions, medium_questions, hard_questions):
        if easy_questions:
            question = EasyQuestion.objects.get(pk = easy_questions[0]['question_id'])
            return question.category
        if medium_questions:
            question = MediumQuestion.objects.get(pk = medium_questions[0]['question_id'])
            return question.category
        if hard_questions:
            question = HardQuestion.objects.get(pk = hard_questions[0]['question_id'])
            return question.category
    
    def get_total_score(self, count):
        # max score of the test
        total_score = 0
        for key in count:
            if key == 'count_easy':
                total_score += count['count_easy'] * self.scoring['easy']
            elif key == 'count_medium':
                total_score += count['count_medium'] * self.scoring['medium']
            elif key == 'count_hard':
                total_score += count['count_hard'] * self.scoring['hard']
        return total_score
        
    
    def post(self, request, *args, **kwargs):
        # evaluates the choices selected for the answers
        # suggestion send the choices directly instead of sending them as (easy, mid, hard) and get the difficulty in the backend 
        data = request.data
        # print(data)
        data['choices'] = json.loads(data['choices'])
        data['count'] = json.loads(data['count'])

        serializer = SubmitAnswersSerializer(data =data)

        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data

        easy = validated_data['choices']['easy']
        medium = validated_data['choices']['medium']
        hard = validated_data['choices']['hard']

        profile = Profile.objects.get(name= request.user)
        category = self.get_category(easy, medium, hard)
        total_score = self.get_total_score(validated_data['count'])
        score =0
        try:
            
            for answer in easy:
                choice_id = answer['answer_id']
                selected_choice = ChoiceForEasyQ.objects.get(pk = choice_id)
                is_correct = selected_choice.is_correct
                if is_correct:
                    score+= self.scoring['easy']
            
            for answer in medium:
                choice_id = answer['answer_id']
                selected_choice = ChoiceForMediumQ.objects.get(pk = choice_id)
                is_correct = selected_choice.is_correct
                if is_correct:
                    score+=self.scoring['medium']

            for answer in hard:
                choice_id = answer['answer_id']
                selected_choice = ChoiceForHardQ.objects.get(pk = choice_id)
                is_correct = selected_choice.is_correct
                if is_correct:
                    score+=self.scoring['hard']

            score_percentage = (score/total_score) *100
            test_lib = TestScoresLibrary.objects.create(profile = profile, score = score_percentage, category = category )
            if score_percentage > 40:
                test_lib.update_average_score(profile= profile, category=category)
            
            
        except :
            return Response({'detail': 'Question or Choice does not exist'}, status=status.HTTP_404_NOT_FOUND)
        return Response(validated_data)