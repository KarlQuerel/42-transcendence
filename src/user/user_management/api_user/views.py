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
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import JsonResponse
import json
import os
import base64
import logging
from django.conf import settings
from .serializers import UsernameSerializer  #TEST CARO


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


@api_view(['PUT'])
@login_required
@permission_classes([IsAuthenticated])
@csrf_protect
def updateProfile(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)

		user.email = request.data.get('email')
		user.date_of_birth = request.data.get('date_of_birth')
		user.first_name = request.data.get('first_name')
		user.last_name = request.data.get('last_name')

		user.save()

		return Response({'success': 'Profile updated successfully'}, status=status.HTTP_200_OK)	

	except Exception as e:
		return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['PUT'])
@login_required
@permission_classes([IsAuthenticated])
@csrf_protect
def updateAvatar(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)

		print(f'Updating user avatar (updateAvatar)...') # DEBUG

		data = request.data.get('avatar_input')
		if not data:
			return Response({'error': 'No avatar data provided'}, status=400)
		
		try:
			avatar_data = base64.b64decode(data)
		except Exception as e:
			return Response({'error de decode64': f'Invalid image data: {str(e)}'}, status=405)

		username = user.username
		avatar_dir = os.path.join(settings.MEDIA_ROOT, 'avatars')
		avatar_path = os.path.join(avatar_dir, f'{username}.jpg')

		print(f'Username: {username}') # DEBUG
		print(f'Avatar path: {avatar_path}') # DEBUG

		try:
			with open(avatar_path, 'wb') as f:
				f.write(avatar_data)
		except Exception as e:
			print(f'Error de open: {str(e)}')
			return Response({'error de open': str(e)}, status=500)

		user.avatar = avatar_path
		print(f'Avatar path: {user.avatar}') # DEBUG

		user.save()
		print(f'Avatar updated (updateAvatar())...') # DEBUG

		return Response({'success': 'Avatar updated successfully'}, status=status.HTTP_200_OK)	

	except Exception as e:
		print(f'Error: {str(e)}') # DEBUG
		return Response({'error': str(e)}, status=500)




# def updateAvatar(request):
#     if request.method == 'PUT':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             username = payload['username']
#             user = User_site.objects.get(username=username)
#             data = request.body
#             # avatar = base64.b64encode(data).decode('utf-8')
#             #save file in media directory
#             with open(f'media/{username}.jpg', 'wb') as f:
#                 f.write(data)
#             user.avatar = f'media/{username}.jpg'
#             user.save()
#             return JsonResponse({'message': 'Avatar updated successfully'}, status=200)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)


#######################################################

## CODE ANTOINE

# views.py

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt, csrf_protect
# from django.utils.decorators import method_decorator
# from django.contrib.auth.hashers import make_password, check_password

# from .forms import UserRegistrationForm, AccessibilityUpdateForm
# from .models import User_site, Accessibility, Stats_user, FriendRequest, Notification
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.decorators import login_required
# from typing import Optional
# from typing import Union
# from django.http import HttpResponse as HTTPResponse
# import jwt
# import json
# import base64
# import os
# import requests
# import time

# def check_auth(request):
#     if request.user.is_authenticated:
#         value = True
#         return JsonResponse({'value': value}, status=200)
#     else:
#         value = False
#         return JsonResponse({'value': value}, status=200)

# @csrf_exempt
# def register(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             # print(data)
#             # language = data.pop('language', None)
#             form = UserRegistrationForm(data)
#             if form.is_valid():
#                 user = form.save(commit=False)
#                 user.set_password(form.cleaned_data['password'])
#                 user.username = form.cleaned_data.get('username', None)
#                 user.save()
#                 settings = Accessibility(user=user)
#                 # settings.language = language
#                 # if settings.language is None:
#                 #     settings.language = 'fr'
#                 settings.save()
#                 stats = Stats_user(user=user)
#                 stats.save()
#                 return JsonResponse({'message': 'User registered successfully'}, status=201)
#             else:
#                 print("DEBUG")
#                 return JsonResponse({'errors': form.errors}, status=400)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# @csrf_exempt
# def loginView(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             user = authenticate(request, username=data['username'], password=data['password'])
#             if user is not None:
#                 user.status = User_site.Status.ONLINE
#                 login(request, user)
#                 user.save()
#                 encoded_jwt = jwt.encode({'username': user.username, 'exp': time.time() + 3600}, 'secret', algorithm='HS256')
#                 return JsonResponse({'message': 'User logged in successfully', 'token': encoded_jwt}, status=200)
#             else:
#                 return JsonResponse({'error': 'Invalid credentials'}, status=401)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# @csrf_protect
# def get_profile(request, nickname):
#     if request.method == 'GET':
#         try:
#             user = User_site.objects.get(nickname=nickname)
#             try:
#                 stats = Stats_user.objects.get(user=user)
#                 avatar_image = user.avatar
#                 avatar = base64.b64encode(avatar_image.read()).decode('utf-8')
#                 data = {'nickname': user.nickname,
#                         'username': user.username,
#                         'email': user.email,
#                         'created_at': user.created_at,
#                         'status': user.status,
#                         'nb_games': stats.nb_games,
#                         'nb_wins': stats.nb_wins,
#                         'nb_losses': stats.nb_losses,
#                         'win_rate': stats.win_rate,
#                         'nb_point_taken' :stats.nb_point_taken,
#                         'nb_point_given' :stats.nb_point_given,
#                         'avatar': avatar,
#                         }
#                 return JsonResponse(data, status=200)
#             except Stats_user.DoesNotExist:
#                 return JsonResponse({'error': 'Stats not found'}, status=404)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# def get_friend_request(request, nickname):
#     if request.method == 'GET':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             try:
#                 user = User_site.objects.get(username=payload['username'])
#             except User_site.DoesNotExist:
#                 return JsonResponse({'error': 'User not found'}, status=404)
#             try:
#                 friend = User_site.objects.get(nickname=nickname)
#             except User_site.DoesNotExist:
#                 return JsonResponse({'error': 'User to request not found'}, status=404)
#             friend_request = FriendRequest.objects.filter(user=user, friend=friend).exclude(status='refused').first()
#             data = {}
#             if friend_request:
#                 # print("FIND FRIEND REQUEST")         # DEBUG
#                 data = {'user': friend_request.user.nickname,
#                         'friend': friend_request.friend.nickname,
#                         'status': friend_request.status,
#                         'created_at': friend_request.created_at}
#                 return JsonResponse(data, status=200)
#             else:
#                 data = {'status': 'not_found'}
#                 return JsonResponse(data, status=200)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)


# def get_Notification(request):
#     if request.method == 'GET':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             if (token_user == 'null'):
#                 return JsonResponse({'error': 'Invalid token'}, status=401)
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             username = payload['username']
#             #get the user, the user_id and the notifications and content of notifications inside the good table
#             user = User_site.objects.get(username=username)
#             user_id = user.id
#             notifications = Notification.objects.filter(user=user_id)
#             notifications_list = []
#             #Table of notifications :
#             # class Notification(models.Model):
#             # user = models.ForeignKey(User_site, on_delete=models.CASCADE)
#             # type = models.CharField(max_length=255)
#             # status = models.CharField(max_length=255, default='unread', choices=[('unread', 'unread'), ('read', 'read')])
#             # friend_request = models.ForeignKey(FriendRequest, on_delete=models.CASCADE, null=True)
#             # # game_invite = models.ForeignKey(GameInvite, on_delete=models.CASCADE, null=True)
#             # # tournament_invite = models.ForeignKey(TournamentInvite, on_delete=models.CASCADE, null=True)
#             # created_at = models.DateTimeField(default=timezone.now)
#             for notification in notifications:
#                 if notification.type == 'friend_request':
#                     avatar = base64.b64encode(notification.friend_request.user.avatar.read()).decode('utf-8')
#                     notifications_list.append({'type': notification.type,
#                                 'from_nickname': notification.friend_request.user.nickname,
#                                 'from_avatar': avatar,
#                                 'created_at': notification.created_at})

#             return JsonResponse(notifications_list, status=200, safe=False)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# def get_notificationUnread(request):
#     if request.method == 'GET':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             if (token_user == 'null'):
#                 return JsonResponse({'error': 'Invalid token'}, status=401)
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             username = payload['username']
#             user = User_site.objects.get(username=username)
#             user_id = user.id
#             notifications = Notification.objects.filter(user=user_id, status='unread')
#             notifications_list = []
#             for notification in notifications:
#                 if notification.type == 'friend_request':
#                     avatar = base64.b64encode(notification.friend_request.user.avatar.read()).decode('utf-8')
#                     notifications_list.append({'type': notification.type,
#                                 'from_user': notification.friend_request.user.nickname,
#                                 'from_avatar': avatar,
#                                 'created_at': notification.created_at})
#             return JsonResponse(notifications_list, status=200, safe=False)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# def read_All_Notification(request):
#     if request.method == 'PUT':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             if (token_user == 'null'):
#                 return JsonResponse({'error': 'Invalid token'}, status=401)
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             username = payload['username']
#             user = User_site.objects.get(username=username)
#             user_id = user.id
#             notifications = Notification.objects.filter(user=user_id, status='unread')
#             for notification in notifications:
#                 notification.status = 'read'
#                 notification.save()
#             return JsonResponse({'message': 'All notifications read successfully'}, status=200)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# def get_Stats(request):
#     if request.method == 'GET':
#         try:
#             stats = Stats_user.objects.get(user=user_id)
#             return JsonResponse({'nb_games': stats.nb_games,
#                                  'nb_wins': stats.nb_wins,
#                                  'nb_losses': stats.nb_losses,
#                                  'win_rate': stats.win_rate,
#                                  'nb_point_taken' :stats.nb_point_taken,
#                                  'nb_point_given' :stats.nb_point_given}, status=200)
#         except Stats_user.DoesNotExist:
#             return JsonResponse({'error': 'Stats not found'}, status=404)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# @login_required(login_url='/api/login')
# def get_settings(request):
#     if request.method == 'GET':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307) #307 Temporary Redirect
#             username = payload['username']
#             user = User_site.objects.get(username=username)
#             user_id = user.id
#             settings = Accessibility.objects.get(user=user_id)
#             avatar_image = user.avatar
#             avatar = base64.b64encode(avatar_image.read()).decode('utf-8')
#             data = {'username': user.username,
#                     'nickname': user.nickname,
#                     'email': user.email,
#                     'language': settings.language,
#                     'font_size': settings.font_size,
#                     'dark_mode': settings.dark_mode,
#                     'avatar': avatar}
#             return JsonResponse(data, status=200)
#         except Accessibility.DoesNotExist:
#             return JsonResponse({'error': 'Settings not found'}, status=404)
#             # except token_user.DoesNotExist:
#     #     return JsonResponse({'error': 'Token not found'}, status=404)        # FIXME Check if token user exists here and in other functions
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# # @login_required(login_url='/api/login')
# # def get_status_all_users(request):
# #     if request.method == 'GET':
# #         users = User_site.objects.all().exclude(id=request.user.id)  # Exclure l'utilisateur actuel
# #         data = []
# #         for user in users:
# #             data.append({'nickname': user.nickname,
# #                          'status': user.status})
# #             # print(data)         # DEBUG
# #         return JsonResponse(data, status=200, safe=False)
# #     else:
# #         return JsonResponse({'error': 'Invalid request method'}, status=405)

# @login_required(login_url='/api/login')
# def all_users(request):
#     if request.method == 'GET':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             username = payload['username']
#             if username:
#                 users = User_site.objects.all().exclude(id=request.user.id)  # Exclure l'utilisateur actuel
#                 data = []
#                 i = 0
#                 for user in users:
#                     # print(i)         # DEBUG
#                     i += 1
#                     #get the avatar of the user and encode it in base64 to send it in the response + nickname
#                     avatar_image = user.avatar
#                     avatar = base64.b64encode(avatar_image.read()).decode('utf-8')
#                     data.append({'nickname': user.nickname,
#                                     'user_id': user.id,
#                                     'avatar': avatar,
#                                     'status': user.status})
#                 return JsonResponse(data, status=200, safe=False)
#             else:
#                 return JsonResponse({'error': 'Invalid token'}, status=401)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)

# @login_required(login_url='/api/login')
# @csrf_protect
# def updateSettings(request):
#     if request.method == 'PUT':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             username = payload['username']
#             data = json.loads(request.body)
#             # print('settings_data:', data)         # DEBUG
#             user = User_site.objects.get(username=username)
#             #update user settings. If data[nickname] is not empty, update the nickname else let the nickname as it is
#             if data['nickname']:
#                 user.nickname = data['nickname']
#             if data['email']:
#                 user.email = data['email']
#             user.save()
#             return JsonResponse({'message': 'Settings updated successfully'}, status=200)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# @login_required(login_url='/api/login')
# @csrf_protect
# def updateAvatar(request):
#     if request.method == 'PUT':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             username = payload['username']
#             user = User_site.objects.get(username=username)
#             data = request.body
#             # avatar = base64.b64encode(data).decode('utf-8')
#             #save file in media directory
#             with open(f'media/{username}.jpg', 'wb') as f:
#                 f.write(data)
#             user.avatar = f'media/{username}.jpg'
#             user.save()
#             return JsonResponse({'message': 'Avatar updated successfully'}, status=200)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# @login_required(login_url='/api/login')
# @csrf_protect
# def deleteAvatar(request):
#     if request.method == 'DELETE':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             username = payload['username']
#             #Delete the avatar of the user and set the default avatar
#             user = User_site.objects.get(username=username)
#             user.avatar = 'media/default.jpg'
#             user.save()
#             #delete the file in the media directory
#             os.remove(f'media/{username}.jpg')
#             return JsonResponse({'message': 'Avatar deleted successfully'}, status=200)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)



# @login_required(login_url='/api/login')
# @csrf_protect
# def updateAccessibility(request):
#     if request.method == 'PUT':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             data = json.loads(request.body)
#             print(f'data: {data}')         # DEBUG
#             username = payload['username']
#             user_id = User_site.objects.get(username=username).id
#             accessibility_id = Accessibility.objects.get(user=user_id)
#             form_accessibility = AccessibilityUpdateForm(data, instance=accessibility_id)
#             if form_accessibility.is_valid():
#                 form_accessibility.save()
#                 return JsonResponse({'message': 'Accessibility updated successfully'}, status=200)
#             else:
#                 return JsonResponse({'errors': form_accessibility.errors}, status=400)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# @login_required(login_url='/api/login')
# @csrf_protect
# def updatePassword(request):
#     if request.method == 'PUT':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             nickname = payload['username']
#             data = json.loads(request.body)
#             # print('password_data:', data)         # DEBUG
#             user = User_site.objects.get(nickname=nickname)
#             if check_password(data['old_password'], user.password):
#                 user.set_password(data['new_password'])
#                 user.save()
#                 return JsonResponse({'message': 'Password updated successfully'}, status=200)
#             else:
#                 return JsonResponse({'error': 'Invalid password'}, status=401)
#         except User_site.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# @login_required(login_url='/api/login') # TODO CHANGE THIS ROUTE TO GO
# @csrf_protect
# def update_Stats(request): #TODO without form and with json.loads. Need to changed if we use a view in python or views in js
#     if request.method == 'POST':
#         try:
#             token_user = request.headers.get('Authorization').split(' ')[1]
#             try:
#                 payload = jwt.decode(token_user, 'secret', algorithms=['HS256'])
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({'error': 'Token expired'}, status=307)
#             username = payload['username']
#             user_id = User_site.objects.get(username=username).id
#             data = json.loads(request.body)
#             stats_id = Stats_user.objects.get(user=user_id)
#             nb_wins = stats_id.nb_wins
#             nb_losses = stats_id.nb_losses
#             if data['result'] == 'win':
#                 nb_wins += 1
#             else:
#                 nb_losses += 1
#             nb_games = stats_id.nb_games
#             nb_games += 1
#             nb_point_taken = stats_id.nb_point_taken
#             nb_point_taken += data['nb_point_taken']
#             nb_point_given = stats_id.nb_point_given
#             nb_point_given += data['nb_point_given']
#             win_rate = nb_wins / nb_games * 100.00
#             stats_id.nb_games = nb_games
#             stats_id.nb_wins = nb_wins
#             stats_id.nb_losses = nb_losses
#             stats_id.nb_point_taken = nb_point_taken
#             stats_id.nb_point_given = nb_point_given
#             stats_id.win_rate = win_rate
#             stats_id.save()
#             return JsonResponse({'message': 'Stats updated successfully'}, status=200)
#         except Stats_user.DoesNotExist:

#             return JsonResponse({'error': 'Stats not found'}, status=404)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# @login_required(login_url='/api/login')
# def logoutView(request):
#     if request.method == 'POST':
#         username = request.user.username
#         user = User_site.objects.get(id=request.user.id)
#         user.status = User_site.Status.OFFLINE
#         user.save()
#         logout(request)
#         return JsonResponse({'message': 'User logged out successfully'}, status=200)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# class Api:
#     intra: str = "https://api.intra.42.fr"
#     client_id: str = ""
#     client_secret: str = ""
#     code_authorize: str = ""
#     redirect_uri: str = ""


#     def __init__(self, client_id: str, client_secret: str, redirect_uri: str):
#         self.client_id = client_id
#         self.client_secret = client_secret
#         self.redirect_uri = redirect_uri

#     def get_code_authorize(self):
#         url = f"{self.intra}/oauth/authorize?client_id={self.client_id}&redirect_uri={self.redirect_uri}&response_type=code"
#         return url


# def auth_42(request):
#     if request.method == 'GET':
#         client_id = os.getenv('CLIENT_ID')
#         client_secret = os.getenv('CLIENT_SECRET')
#         redirect_uri = os.getenv('REDIRECT_URI')
#         api = Api(client_id, client_secret, redirect_uri)
#         url = api.get_code_authorize()
#         return JsonResponse({'url': url}, status=200)

# def check_user42(login):
#     try:
#         user = User_site.objects.get(nickname=login)
#         return True
#     except User_site.DoesNotExist:
#         return False

# def create_user42(response, code):
#     data = response.json()
#     access_token = data['access_token']
#     expires_in = data['expires_in'] + data['created_at']
#     url = "https://api.intra.42.fr/v2/me"
#     headers = {
#         'Authorization': f"Bearer {access_token}"
#     }
#     r = requests.get(url, headers=headers)
#     if r.status_code == 200:
#         data = r.json()
#         #save data json in media directory
#         with open('data.json', 'w') as f:
#             json.dump(data, f, indent=4)
#         username = data['login']
#         email = data['email']
#         nickname = data['login']
#         url = data['image']['versions']['medium']
#         r = requests.get(url)
#         with open(f'media/{username}.jpg', 'wb') as f:
#             f.write(r.content)
#         avatar = f'media/{username}.jpg' #TODO change this to the path of the image
#         if not check_user42(username):
#             user = User_site(username=username, email=email, nickname=nickname, avatar=avatar)
#             user.set_password(code) #J espere que ca marche
#             user.status = User_site.Status.ONLINE
#             user.save()
#             settings = Accessibility(user=user)
#             settings.save()
#             stats = Stats_user(user=user)
#             stats.save()
#         else:
#             user = User_site.objects.get(nickname=nickname)
#             user.set_password(code)
#             user.status = User_site.Status.ONLINE
#             user.save()
#         return user
#     else:
#         return 401

# @csrf_exempt #TODO: CHECK IF THIS IS THE RIGHT DECORATOR
# def token_42(request):
#     if request.method == 'POST':
#         print('request:', request.body)         # DEBUG
#         client_id = os.getenv('CLIENT_ID')
#         client_secret = os.getenv('CLIENT_SECRET')
#         redirect_uri = os.getenv('REDIRECT_URI')
#         data = json.loads(request.body)
#         code = data['code']
#         print(f"code: {code}")         # DEBUG
#         # print(f"code: {code}")         # DEBUG
#         # print(f"client_id: {client_id}")         # DEBUG
#         # print(f"client_secret: {client_secret}")         # DEBUG
#         url = f"https://api.intra.42.fr/oauth/token?client_id={client_id}&client_secret={client_secret}&code={code}&redirect_uri={redirect_uri}&grant_type=authorization_code"
#         r = requests.post(url)
#         if r.status_code == 200:
#             # print('OKI MA GUEULE')         # DEBUG
#             user = create_user42(r, code)
#             if user != 401:

#                 #authenticate user
#                 print('username: ', user.username)         # DEBUG
#                 user = authenticate(request, username=user.username, password=code)
#                 if user is not None:
#                     login(request, user)
#                     encoded_jwt = jwt.encode({'username': user.username, 'exp': time.time() + 3600}, 'secret', algorithm='HS256')
#                     return JsonResponse({'message': 'Token created successfully', 'token': encoded_jwt, 'nickname': user.nickname}, status=200)
#                 else:
#                     return JsonResponse({'error': 'Invalid credentials'}, status=401)
#             else:
#                 return JsonResponse({'error': 'User not created'}, status=401)
#         else:
#             return JsonResponse({'error': 'Invalid request'}, status=400)
