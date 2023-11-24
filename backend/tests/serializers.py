from rest_framework import serializers

from .models import (
    Test, Category, EasyQuestion, MediumQuestion, 
    HardQuestion, ChoiceForEasyQ ,ChoiceForMediumQ, 
    ChoiceForHardQ,
    )

class EasyChoiceSerializer(serializers.ModelSerializer):
    difficulty = serializers.SerializerMethodField()
    class Meta:
        model = ChoiceForEasyQ
        fields = ['pk', 'text', 'is_correct', 'difficulty']
    
    def get_difficulty(self, obj):
        return "easy"

class MediumChoiceSerializer(serializers.ModelSerializer):
    difficulty = serializers.SerializerMethodField()
    class Meta:
        model = ChoiceForMediumQ
        fields = ['pk', 'text', 'is_correct', 'difficulty']
    
    def get_difficulty(self, obj):
        return "medium"

class HardChoiceSerializer(serializers.ModelSerializer):
    difficulty = serializers.SerializerMethodField()
    class Meta:
        model = ChoiceForHardQ
        fields = ['pk', 'text', 'is_correct', 'difficulty']

    def get_difficulty(self, obj):
        return "hard"


class EasyQuestionListSerializer(serializers.ModelSerializer):
    choices = EasyChoiceSerializer(source = 'choiceforeasyq_set', read_only = True, many =True)
    class Meta:
        model = EasyQuestion
        fields = [
            'pk',
            'text',
            'choices',
        ]

    

class MediumQuestionListSerializer(serializers.ModelSerializer):
    choices = EasyChoiceSerializer(source = 'choiceformediumq_set', read_only = True, many =True)
    class Meta:
        model = MediumQuestion
        fields = [
            'pk',
            'text',
            'choices',

        ]


class HardQuestionListSerializer(serializers.ModelSerializer):
    choices = EasyChoiceSerializer(source = 'choiceforhardq_set', read_only = True, many =True)
    class Meta:
        model = HardQuestion
        fields = [
            'pk',
            'text',
            'choices',
        ]

class TestListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        # exclude = ['difficulty']

class QuestionListSerializer(serializers.ModelSerializer):
    # xp = serializers.SerializerMethodField(read_only = True)
    easy_questions = EasyQuestionListSerializer(source = 'easyquestion_set', many=True, read_only=True)
    medium_questions = MediumQuestionListSerializer(source='mediumquestion_set', many=True, read_only=True)    
    hard_questions = HardQuestionListSerializer(source='hardquestion_set', many=True, read_only=True)


    class Meta:
        model = Test
        fields = [
            'pk',
            'title',
            # 'difficulty',
            # 'description',
            # 'category',
            # 'test_file',
            # 'created_at',
            # 'updated_at',
            'easy_questions',
            'medium_questions',
            'hard_questions'
        ]
        depth = 0

    def get_xp(self, instance):
        pass

    def to_representation(self, instance):
        # Limit the number of easy questions to 5 (change the limit as needed)
        # xp
        # total_questions = x
        # use total questions and xp to set the individual limit for the questions

        limit = 5
        queryset1 = instance.easyquestion_set.all()[:limit]
        queryset2 = instance.mediumquestion_set.all()[:limit]
        queryset3 = instance.hardquestion_set.all()[:limit]

        # Serialize the limited queryset
        easy_questions_data = EasyQuestionListSerializer(queryset1, many=True).data
        medium_questions_data = EasyQuestionListSerializer(queryset2, many=True).data
        hard_questions_data = EasyQuestionListSerializer(queryset3, many=True).data
        # Add the serialized data to the representation
        # representation = super(TestListSerializer, self).to_representation(instance)
        representation = super().to_representation(instance)
        representation['easy_questions'] = easy_questions_data
        representation['medium_questions'] = medium_questions_data
        representation['hard_questions'] = hard_questions_data
        return representation

class AnswerSubmissionSerializer(serializers.Serializer):
    difficulty = serializers.CharField()
    answer_id = serializers.IntegerField()

