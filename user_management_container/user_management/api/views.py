from rest_framework.response import Response
#converts any response to json

from rest_framework.decorators import api_view
from base.models import User
from .serializers import userSerializer

@api_view(['GET'])
def getData(request):
	items = User.objects.all()
	serializer = userSerializer(items, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def addUser(request):
	serializer = userSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)