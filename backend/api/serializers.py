from django.contrib.auth.models import User

from rest_framework import serializers

from user_profiles.models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password'
        ]
        extra_kwargs = {
            'password':{
                'write_only': True
            }
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        Profile.objects.create(
            user = user,
            name = user.username
        )
        return user