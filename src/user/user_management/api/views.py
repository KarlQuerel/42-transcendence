# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework.decorators import permission_classes
# from rest_framework.views import APIView
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt
from api.models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
# from .forms import UserRegistrationForm
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json


# Retrieves a list of all CustomUser instances, all users'data
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getData(request):
# 	items = CustomUser.objects.all()
# 	serializer = CustomUserSerializer(items, many=True)
# 	return Response(serializer.data)


#### Autre maniere de faire getData ####

# def get_user_data(request):
#     user = request.user
#     user_data = {
#         'username': user.username,
#         'email': user.email,
#         'avatar_url': user.profile.avatar_url,
#         # Add other user data fields as needed
#     }
#     return Response(user_data)

#########################################

# # For user registration
@api_view(['POST'])
def addUser(request):
	serializer = CustomUserSerializer(data=request.data)
	if serializer.is_valid():
		validated_data = serializer.validated_data
        
		user = CustomUser(
                  username=validated_data['username'],
                  email=validated_data['email'],
                  date_of_birth=validated_data['date_of_birth'],
                  first_name=validated_data['first_name'],
                  last_name=validated_data['last_name'],
		)
		user.set_password(request.data['password']) 
		user.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)
	print(serializer.errors)  # Log the serializer errors for debugging
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def signInUser(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			username = request.data.get('username')
			password = request.data.get('password')

			# Authenticate the user
			user = authenticate(request, username=username, password=password)
		
			if user is not None:
				login(request, user)
				refresh = RefreshToken.for_user(user)
				access_token = str(refresh.access_token)
				refresh_token = str(refresh)
				return JsonResponse({
                    'access': access_token,
                    'refresh': refresh_token
                }, status=200)
			else:
				return JsonResponse({'error': 'Invalid username or password'}, status=400)
		
		except json.JSONDecodeError:
			return JsonResponse({'error': 'Invalid JSON'}, status=400)

	return JsonResponse({'error': 'Invalid request method'}, status=405)
      


# @api_view(['POST'])
# def addUser(request):
# 	data = json.loads(request.body)
# 	form = UserRegistrationForm(data)
# 	if form.is_valid():
# 		user = form.save(commit=False)
# 		user.set_password(form.cleaned_data['password'])
# 		user.username = form.cleaned_data.get('username', None)
# 		user.save()
# 		return Response({'username': user.username}, status=status.HTTP_201_CREATED)
# 	return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)



# Sends to the frontend the profile of the currently authenticated user
class UserProfileView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user
        # return CustomUser.objects.get(username='cbernaze')

## Ne peut pas etre testé avec une entrée fixe, comme 'cbernaze'. Il faut que l'utilisateur soit authentifié pour que la requête fonctionne.



# class	CustomUserAPIView(APIView):

# @api_view(['GET'])
# def check_existing_username(request):
# 	if request.method == 'GET':
# 		username = request.GET.get('username', None)
# 		if username:
# 			exists = CustomUser.objects.filter(username=username).exists()
# 			return Response({'exists': bool(exists)})
# 		else:
# 			return Response({'error': 'Username parameter missing'}, status=400)
# 	else:
# 		return Response({'error': 'Invalid request method'}, status=405)

# @api_view(['GET'])
# def check_existing_email(request):
# 	if request.method == 'GET':
# 		email = request.GET.get('email', None)
# 		if email:
# 			exists = CustomUser.objects.filter(email=email).exists()
# 			return Response({'exists': bool(exists)})
# 		else:
# 			return Response({'error': 'Email parameter missing'}, status=400)
# 	else:
# 		return Response({'error': 'Invalid request method'}, status=405)
	
