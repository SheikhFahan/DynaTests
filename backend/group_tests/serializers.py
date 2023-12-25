from rest_framework import serializers

from .models import GroupTest

class GroupTestSerializer(serializers.ModelSerializer):
    # for creating of group test
    class Meta:
        model = GroupTest
        fields = [
            'user',
            'title',
            'description',
            'category',
            'easy_test_file',
            'medium_test_file',
            'hard_test_file',

        ]

        extra_kwargs = {
            'password' : {'write_only'  :True}
        }
