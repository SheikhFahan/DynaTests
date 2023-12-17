from rest_framework import serializers

from .models import Profile, TestMarksLibrary

from tests.serializers import CategoryListCreateSerializer

import datetime

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

        # def to_representation(self, instance):
        #     representation = super().to_representation(instance)

        #     # Convert the timestamp string to a datetime object
        #     timestamp_str = representation.get('timestamp', '')
        #     print(timestamp_str)
        #     timestamp = datetime.fromisoformat(timestamp_str)

        #     # Extract the date and time parts
        #     date_part = timestamp.strftime('%Y-%m-%d')
        #     time_part = timestamp.strftime('%H:%M')

        #     # Update the representation with the extracted parts
        #     representation.pop('timestamp')

 

        #     return representation
