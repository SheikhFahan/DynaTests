from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse

from tests.serializers import CategoryListCreateSerializer
from tests.models import Category

from .serializers import  UserProfileSerializer, TestMarksLibraryListSerializer
from .models import TestMarksLibrary, Profile, AverageScore

class ProfileRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        
        user = self.request.user
        profile = Profile.objects.get(user = user)
        # obj = generics.get_object_or_404(queryset, profile)
        # self.check_object_permissions(self.request, obj)
        return profile


class CategoryRetrieveSerializer(generics.ListAPIView):
    serializer_class = CategoryListCreateSerializer

    def get_category_list(self, qs):
        list_of_dicts = []
        print(qs)
        for object in qs:
            for k in object:
                name = Category.objects.get(pk = object[k]).name
                new_dict = {'name': name , 'pk': object[k]}
                list_of_dicts.append(new_dict)
        
        return list_of_dicts
        
    
    def get_queryset(self):
        user = self.request.user
        profile = Profile.objects.get(user = user)
        # gets the categories from the tests the user has attempted
        categories = AverageScore.objects.filter(profile = profile).values('category')
        print(AverageScore.objects.all())
        category_list = self.get_category_list(categories)
        return category_list
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many = True)
        return Response(serializer.data)
    
class TestMarksLibraryListAPIView(generics.ListAPIView):
    serializer_class = TestMarksLibraryListSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        user = self.request.user
        profile  = Profile.objects.get(user =user)
        marks_lib = TestMarksLibrary.objects.filter(profile = profile, category = category)
        return marks_lib