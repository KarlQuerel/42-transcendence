from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
#converts any response to json
from django.views.decorators.csrf import csrf_exempt
from api.models import CustomUser
from .serializers import CustomUserSerializer

@api_view(['GET'])
def getData(request):
	items = CustomUser.objects.all()
	serializer = CustomUserSerializer(items, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def addUser(request):
	serializer = CustomUserSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

# class	CustomUserAPIView(APIView):

def check_existing_username(request):
	if request.method == 'GET':
		username = request.GET.get('username', None)
		if username:
			exists = CustomUser.objects.filter(username=username).exists()
			return Response({'exists': bool(exists)})
		else:
			return Response({'error': 'Username parameter missing'}, status=400)
	else:
		return Response({'error': 'Invalid request method'}, status=405)

def check_existing_email(request):
	if request.method == 'GET':
		email = request.GET.get('email', None)
		if email:
			exists = CustomUser.objects.filter(email=email).exists()
			return Response({'exists': bool(exists)})
		else:
			return Response({'error': 'Email parameter missing'}, status=400)
	else:
		return Response({'error': 'Invalid request method'}, status=405)