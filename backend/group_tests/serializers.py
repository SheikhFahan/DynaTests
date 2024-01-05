from rest_framework import serializers

from .models import (GroupTest, GroupTestCategory, GroupTestCombinedCategory,
                     TestPassword, GroupTestPassword
                     )

class GroupTestSerializer(serializers.ModelSerializer):
    # for creating of group test
    class Meta:
        model = GroupTest
        fields = [
            'title',
            'description',
            'category',
            'easy_test_file',
            'medium_test_file',
            'hard_test_file',
            'has_password'
        ]

        extra_kwargs = {
            'password' : {'write_only'  :True}
        }

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupTestCategory
        fields = [
            'name'
        ]

class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPassword
        fields = [
            'test',
            'password'
        ]
