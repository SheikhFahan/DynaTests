from rest_framework import serializers

from .models import Test, Category, EasyQuestion, MediumQuestion, HardQuestion, ChoiceForEasyQ ,ChoiceForMediumQ, ChoiceForHardQ

class EasyQuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EasyQuestion
        fields = '__all__'

class MediumQuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediumQuestion
        fields = '__all__'

class HardQuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = HardQuestion
        fields = '__all__'



class TestListSerializer(serializers.ModelSerializer):
    easy_questions = EasyQuestionListSerializer(source='easyquestion_set', many=True, read_only=True)
    medium_questions = MediumQuestionListSerializer(source='mediumquestion_set', many=True, read_only=True)    
    hard_questions = HardQuestionListSerializer(source='hardquestion_set', many=True, read_only=True)

    class Meta:
        model = Test
        fields = [
            'title',
            'difficulty',
            'description',
            'category',
            'test_file',
            'created_at',
            'updated_at',
            'easy_questions',
            'medium_questions',
            'hard_questions'
        ]

    # def get_easy_questions(self, obj):
    #     user = 
        
    



# class TestCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         field = [
#             ''
#         ]