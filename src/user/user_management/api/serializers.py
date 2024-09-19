from rest_framework import serializers
from api.models import CustomUser
import base64

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    # avatar_data = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email', 'date_of_birth', 'first_name', 'last_name']


    # def get_avatar_data(self, obj):
    #     if obj.avatar:
    #         with open(obj.avatar.path, 'rb') as avatar_file:
    #             return base64.b64encode(avatar_file.read()).decode('utf-8')
    #     return None


    # def create(self, validated_data):
    #     friends_data = validated_data.pop('friends', [])
    #     user = CustomUser.objects.create_user(**validated_data)
    #     user.friends.set(friends_data)
    #     return user


    # def update(self, instance, validated_data):
    #     friends_data = validated_data.pop('friends', [])
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.set_password(validated_data['password'])
    #     instance.save()
    #     instance.friends.set(friends_data)
    #     return instance



#TEST CARO

class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username']