from rest_framework import serializers

from .models import Test, Category, EasyQuestion, MediumQuestion, HardQuestion, ChoiceForEasyQ ,ChoiceForMediumQ, ChoiceForHardQ

class EasyQuestionListSerializer(serializers.Serializer):
    class Meta:
        model = EasyQuestion
        fields = [
            'text'
        ]
        # fields = [
        #     'text'
        # ]

class MediumQuestionListSerializer(serializers.Serializer):
    class Meta:
        model = MediumQuestion
        fields = '__all__()'
        # fields = [
        #     'text'
        # ]

class HardQuestionListSerializer(serializers.Serializer):
    class Meta:
        model = HardQuestion
        fields = [
            'text'
        ]

class TestCreateSerializer(serializers.ModelSerializer):
    easy_questions = EasyQuestionListSerializer( many = True, read_only=True)
    medium_questions = MediumQuestionListSerializer( many = True, read_only=True)
    hard_quesions = HardQuestionListSerializer( many = True, read_only=True)

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
            'hard_quesions'
        ]
    



# class TestCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         field = [
#             ''
#         ]