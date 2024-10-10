from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from django.contrib.auth.forms import SetPasswordForm
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from api_user.models import CustomUser
from .forms import CustomUserRegistrationForm
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from rest_framework.permissions import AllowAny
from django.shortcuts import render, redirect
# from rest_framework.views import APIView
from rest_framework import generics, status, permissions
from django.core.files.storage import default_storage
from django.http import JsonResponse
import json
import base64
import logging
from django.conf import settings
from .serializers import UsernameSerializer, CustomUserSerializer #TEST CARO


#########################################


# For user registration

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def addUser(request):
	try:
		data = json.loads(request.body)
		print(f"Received data: {data}") # DEBUG
	except json.JSONDecodeError:
		return JsonResponse({'error': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)

	form = CustomUserRegistrationForm(data)

	if form.is_valid():
		user = form.save(commit=False)
		user.set_password(form.cleaned_data['password'])
		user.save()
		return JsonResponse(form.cleaned_data, status=status.HTTP_201_CREATED)

	else:
		print(f"Form errors: {form.errors}") # DEBUG
		return JsonResponse(form.errors, status=status.HTTP_400_BAD_REQUEST)


#########################################


# For user login

# csrf Token exempté car on utilise les JWTokens à la place
@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def signInUser(request):
	try:
		data = json.loads(request.body)

		print(f'SignInUser json data: {data}') # DEBUG

		username = data.get('username')
		password = data.get('password')

		user = authenticate(request, username=username, password=password)

		if user is not None:
			login(request, user)
			refresh = RefreshToken.for_user(user)
			access_token = str(refresh.access_token)
			refresh_token = str(refresh)
			return JsonResponse({'access': access_token, 'refresh': refresh_token}, status=200)
		else:
			return JsonResponse({'error': 'Invalid username or password'}, status=403)

	except json.JSONDecodeError:
		return JsonResponse({'error': 'Invalid JSON'}, status=401)
	except Exception as e:
		print(f'Unexpected error: {str(e)}') # DEBUG
		return Response({'error': 'Internal Server Error'}, status=500)


#########################################


# Get authenticated user's data

@api_view(['GET'])
@login_required
@permission_classes([IsAuthenticated])
def currentlyLoggedInUser(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)

		avatar_image_path = user.avatar.path # C'EST CA LE PROBLEME
		with default_storage.open(avatar_image_path, 'rb') as avatar_image:
			avatar = base64.b64encode(avatar_image.read()).decode('utf-8')

		data = {
			'first_name': user.first_name,
			'last_name': user.last_name,
			'username': user.username,
			'password': user.password,
			'date_of_birth': user.date_of_birth,
			'email': user.email,
			'avatar': avatar
		}

		return JsonResponse(data, status=200)

	except Exception as e:
		return Response({'error': str(e)}, status=500)


#########################################


# Get the username of authenticated user

@api_view(['GET'])
@login_required
@permission_classes([IsAuthenticated])
def getUsername(request):
    if request.user.is_authenticated:
        serializer = UsernameSerializer(request.user)
        return Response(serializer.data)
    else:
        return Response({'error': 'User not authenticated'}, status=401)


#########################################


# Get avatars and usernames of all users

@api_view(['GET'])
@login_required
@permission_classes([IsAuthenticated])
def getAllUserAvatars(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)

		try:
			users = CustomUser.objects.all()
			avatars = []
		
			for user in users:
				avatar_image_path = user.avatar.path
				with default_storage.open(avatar_image_path, 'rb') as avatar_image:
					avatar = base64.b64encode(avatar_image.read()).decode('utf-8')
				avatars.append({'username': user.username, 'avatar': avatar})

			return JsonResponse(avatars, safe=False, status=200)

		except Exception as e:
			return Response({'error': str(e)}, status=500)

	except Exception as e:
		return Response({'error': str(e)}, status=500)



#########################################


# Get authenticated user's avatar image

# @api_view(['GET'])
# @login_required
# @permission_classes([IsAuthenticated])
# def getAvatar(request):
# 	try:
# 		user = request.user
# 		if not user.is_authenticated:
# 			return Response({'error': 'User not authenticated'}, status=401)

# 		avatar = user.avatar

# 		if avatar:
# 			avatar_url = avatar.url
# 			print(f'Avatar URL: {avatar_url}') # DEBUG
# 		else:
# 			avatar_url = f'{settings.MEDIA_URL}avatars/default.png'
		
# 		return JsonResponse({'avatar_url': avatar_url})
	
# 	except Exception as e:
# 		return Response({'error': str(e)}, status=500)



##################################################
##             CHANGE PASSWORD VIEWS            ##
##################################################


# For changing password, using Django's built-in password change form (SetPasswordForm)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@csrf_protect
def changePassword(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)

		form = SetPasswordForm(user, request.data)

		if form.is_valid():
			form.save()
			return Response({'success': 'Password changed successfully'}, status=status.HTTP_200_OK)
		else:
			return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
	
	except Exception as e:
		return Response({'error': str(e)}, status=500)
	


#########################################


#For checking if a user is connected

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def checkAuthentication(request):
	user = request.user
	if not user.is_authenticated:
			return Response({'authenticated': False}, status=401)
	return Response({'authenticated': True}, status=200)


#########################################


# For checking if old password is correct

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verifyPassword(request):
    user = request.user
    current_password = request.data.get('currentPassword')

    if not current_password:
        return Response({'error': 'Current password is required'}, status=status.HTTP_400_BAD_REQUEST)

    if user.check_password(current_password):
        return Response({'valid': True, 'currentPassword': user.password}, status=status.HTTP_200_OK)
    else:
        return Response({'valid': False}, status=status.HTTP_400_BAD_REQUEST)


#########################################



# For changing the old password with the new hashed password

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@csrf_protect
def hashAndChangePassword(request):
	user = request.user
	new_password = request.data.get('newPassword')

	if not new_password:
		return Response({'error': 'New password is required'}, status=status.HTTP_400_BAD_REQUEST)

	try:
		hashed_password = make_password(new_password)
		user.password = hashed_password
		user.save()
		return Response({'success': 'Password changed successfully'}, status=status.HTTP_200_OK)
	except Exception as e:
		return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
	

##################################################
##           CHANGE PROFILE INFO VIEWS          ##
##################################################

@login_required
@csrf_protect
@api_view(['PUT'])
def updateProfile(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)

		user.email = request.data.get('email')
		user.date_of_birth = request.data.get('date_of_birth')
		user.first_name = request.data.get('first_name')
		user.last_name = request.data.get('last_name')

		# print('Before if avatar...') # DEBUG
		# print('Avatar: ', request.data.get('avatar')) # DEBUG >>> Image en string base64

		if (request.data.get('avatar')):
			print('Inside if avatar...') # DEBUG
			avatar_file = request.data.get('avatar')

			avatar_path = f'avatars/{user.username}'
			print(f'Avatar_path: {avatar_path}') # DEBUG

			path = default_storage.save(avatar_path, ContentFile(avatar_file.read())) # PROBLEME ICI
			print(f'Avatar Path: {path}') # DEBUG
			user.avatar = path
		else:
			user.avatar = 'avatars/default.png'

		print(f'Updated user data...') # DEBUG
		print(f'Email: {user.email}') # DEBUG
		print(f'Date of birth: {user.date_of_birth}') # DEBUG
		print(f'First name: {user.first_name}') # DEBUG
		print(f'Last name: {user.last_name}') # DEBUG
		print(f'Avatar: {user.avatar}') # DEBUG

		user.save()

		return Response({'success': 'Profile updated successfully'}, status=status.HTTP_200_OK)	

	except Exception as e:
		return Response({'error': str(e)}, status=500)
