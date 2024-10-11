from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from api_user.models import CustomUser
from .forms import CustomUserRegistrationForm
# from .serializers import CustomUserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
# from rest_framework.views import APIView
from rest_framework import generics, status, permissions
from django.http import JsonResponse
from django.shortcuts import redirect
from django.core.mail import send_mail
import pyotp, time, os
import json
import logging
from .serializers import UsernameSerializer #TEST CARO


#########################################


# For user registration

# password1

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
		user.set_password(form.cleaned_data['password'])
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
				if user.is2fa == True:
					totp = send_2fa_totp(user)
					request.session['pre_2fa_user_id'] = user.id

					return JsonResponse({'totp': totp, 'is2fa': True}, status=status.HTTP_200_OK)
				else:
					login(request, user)
					refresh = RefreshToken.for_user(user)
					access_token = str(refresh.access_token)
					refresh_token = str(refresh)
					return JsonResponse({'access': access_token, 'refresh': refresh_token, '2fa': False}, status=200)
			else:
				return JsonResponse({'error': 'Invalid username or password'}, status=400)
		
		except json.JSONDecodeError:
			return JsonResponse({'error': 'Invalid JSON'}, status=400)

	return JsonResponse({'error': 'Invalid request method'}, status=405)


def send_2fa_totp(user):
	if not user.totp_secret:
		user.totp_secret = pyotp.random_base32()
		user.save()
	totp = pyotp.TOTP(user.totp_secret)
	code = totp.now()

	send_mail(
		f'Verification code for {user.username} on transcendance.fr',
		f'Please enter this one-time code to log into your account: {code}',
		str(os.getenv('EMAIL_HOST_USER')),
		['traans.een.daance@gmail.com'],
		fail_silently=False,
	)

	return code

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def verify_2fa_code(request):
	code = request.data.get('code')
	user_id = request.session.get('pre_2fa_user_id')
	
	if user_id:
		user = CustomUser.objects.get(id=user_id)
		totp = pyotp.TOTP(user.totp_secret)
		print('totp: ', totp.now())
		if totp.verify(code):
			login(request, user)
			refresh = RefreshToken.for_user(request.user)
			access_token = str(refresh.access_token)
			refresh_token = str(refresh)

			return JsonResponse({'username': user.username, 'access': access_token, 'refresh': refresh_token, '2fa': False}, status=status.HTTP_200_OK)
		else:
			return JsonResponse({'error': 'Invalid 2fa code'}, status=status.HTTP_400_BAD_REQUEST)
	else:
			return JsonResponse({'error': 'User ID doesn\'t exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def resend_2fa_code(request):
	user_id = request.session.get('pre_2fa_user_id')
	if user_id:
		user = CustomUser.objects.get(id=user_id)
		send_2fa_totp(user)
		return JsonResponse({'message': 'New 2FA code sent'}, status=status.HTTP_200_OK)
	else:
		return JsonResponse({'error': 'User ID doesn\'t exist'}, status=status.HTTP_404_NOT_FOUND)
#########################################

# Check which user is authenticated
# password1
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@login_required
def currentlyLoggedInUser(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)

		return Response({'Authentication success': True,
			'first_name': user.first_name,
			'last_name': user.last_name,
			'username': user.username,
			'password': user.password,
			'date_of_birth': user.date_of_birth,
			'email': user.email
		})
	except Exception as e:
		return Response({'error': str(e)}, status=500)


#########################################


#TEST CARO
@api_view(['GET'])
@login_required
def getUsername(request):
	if request.user.is_authenticated:
		serializer = UsernameSerializer(request.user)
		return Response(serializer.data)
	else:
		return Response({'error': 'User not authenticated'}, status=401)