from django.contrib.auth.models import User, Group

from rest_framework import serializers

from user_profiles.models import Profile
from user_profiles.user_group_models import InstituteProfile

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
    
class InstituteUserSerializer(serializers.Serializer):
    """
    to create the login_id for an institute
    """
    email = serializers.EmailField()
    username = serializers.CharField()
    phone = serializers.IntegerField()
    college_name = serializers.CharField()
    university_name = serializers.CharField()
    address =serializers.CharField()
    password = serializers.CharField(write_only = True)

    def create(self, validated_data):
        # creating Institute profile user 
        password = validated_data.pop('password')
        college_name = validated_data.pop('college_name')
        university_name = validated_data.pop('university_name')
        address  = validated_data.pop('address')
        phone  = validated_data.pop('phone')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        group= Group.objects.get(name = 'institute')
        print(group)
        user.groups.add(group)
        institute_profile =  InstituteProfile.objects.create(
                user = user,
                college_name = college_name,
                email = user.email,
                phone = phone,
                university_name = university_name,
                address = address

            )
        # this return value is given as output after a user is created
        return {
            "email": user.email,
            "username": user.username,
            "phone": phone,
            "college_name": college_name,
            "university_name": university_name,
            "address": address,
            }
