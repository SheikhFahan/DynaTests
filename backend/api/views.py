from django.shortcuts import render

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, permissions

from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, InstituteUserSerializer
from user_profiles.user_group_models import InstituteProfile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserCreateAPIView(generics.CreateAPIView):
    """
    for accounts for test attending candidates
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def perform_create(self, serializer):
        print(serializer)
        serializer.save()

class InstituteUserCreateAPIView(generics.CreateAPIView):
    serializer_class = InstituteUserSerializer
    queryset = InstituteProfile.objects.all()


    
