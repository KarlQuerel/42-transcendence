#converts any response to json

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from base.models import CustomUser
from .serializers import CustomUserSerializer



# Retrieves a list of all CustomUser instances, all users'data
@api_view(['GET'])
def getData(request):
	items = CustomUser.objects.all()
	serializer = CustomUserSerializer(items, many=True)
	return Response(serializer.data)


# For user registration
@api_view(['POST'])
def addUser(request):
	serializer = CustomUserSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)



# Retrieves the profile of the currently authenticated user

class UserProfileView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user
