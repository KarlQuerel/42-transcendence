from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from api.models import CustomUser
from .forms import CustomUserRegistrationForm
# from .serializers import CustomUserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
# from rest_framework.views import APIView
from rest_framework import generics, status, permissions
from django.http import JsonResponse
import json
import logging
from .serializers import UsernameSerializer #TEST CARO


#########################################


# For user registration

logger = logging.getLogger(__name__)

@api_view(['POST'])
def addUser(request):
	try:
		data = json.loads(request.body)
		logger.debug(f"Received data: {data}") # DEBUG
	except json.JSONDecodeError:
		return JsonResponse({'error': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)
	
	form = CustomUserRegistrationForm(data)

	if form.is_valid():
		user = form.save(commit=False)
		user.set_password(form.cleaned_data['password1'])
		user.save()
		return JsonResponse(form.cleaned_data, status=status.HTTP_201_CREATED)

	else:
		logger.debug(f"Form errors: {form.errors}") # DEBUG
		return JsonResponse(form.errors, status=status.HTTP_400_BAD_REQUEST)


#########################################

# For user login

# csrf Token exempté car on utilise les JWTokens à la place
@csrf_exempt
def signInUser(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			print(data) # DEBUG
			username = data.get('username')
			password = data.get('password')
			print(f'username: {username}, password: {password}') # DEBUG

			user = authenticate(request, username=username, password=password)
			print(f'Authenticated user: {user}') # DEBUG

			if user is not None:
				login(request, user)
				refresh = RefreshToken.for_user(user)
				access_token = str(refresh.access_token)
				refresh_token = str(refresh)
				return JsonResponse({'access': access_token, 'refresh': refresh_token}, status=200)
			else:
				return JsonResponse({'error': 'Invalid username or password'}, status=400)
		
		except json.JSONDecodeError:
			return JsonResponse({'error': 'Invalid JSON'}, status=400)

	return JsonResponse({'error': 'Invalid request method'}, status=405)


#########################################

# Check which user is authenticated

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@login_required
def currentlyLoggedInUser(request):
    try:
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=401)
        
        return Response({
			'first_name': user.first_name,
			'last_name': user.last_name,
            'username': user.username,
			'password': user.password1,
			'date_of_birth': user.date_of_birth,
            'email': user.email
        })
    except Exception as e:
        return Response({'error': str(e)}, status=500)





#########################################

# Temporary code


# # # Sends to the frontend the profile of the currently authenticated user
# class CustomUserProfileView(APIView):
# 	authentication_classes = [JWTAuthentication]
# 	def get(self, request):
# 		try:
# 			serializer = CustomUserDisplaySerializer(request.user)
# 			return Response({'user': serializer.data, 'success': True},status=status.HTTP_200_OK)
# 		except Exception as e:
# 			return Response({'error': str(e)}, status=status.HTTP_200_OK)


# ## Ne peut pas etre testé avec une entrée fixe, comme 'cbernaze'. Il faut que l'utilisateur soit authentifié pour que la requête fonctionne.

#########################################



###################################################################################################



# Sends to the frontend the profile of the currently authenticated user
# class UserProfileView(generics.RetrieveAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserRegistrationSerializer

#     def get_object(self):
#         return self.request.user



###################################################################################################

# @api_view(['GET'])
# def getUsername(request):
#     if request.user.is_authenticated:
#         username = request.user.username
#         return Response({'username': username})
#     else:
#         return Response({'error': 'Utilisateur non authentifié'}, status=401)


#TEST CARO
@api_view(['GET'])
def getUsername(request):
    if request.user.is_authenticated:
        serializer = UsernameSerializer(request.user)
        return Response(serializer.data)
    else:
        return Response({'error': 'User not authenticated'}, status=401)