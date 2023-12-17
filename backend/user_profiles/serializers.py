from rest_framework import serializers

from .models import Profile, TestMarksLibrary

from tests.serializers import CategoryListCreateSerializer

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'name',
            'email',
            'phone'
        ]

class TestMarksLibraryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestMarksLibrary
        fields = [
            'score',
            'timestamp'
        ]

