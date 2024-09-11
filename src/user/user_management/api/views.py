# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework.decorators import permission_classes
# from rest_framework.views import APIView
from rest_framework import generics, status, permissions
from django.views.decorators.csrf import csrf_exempt
from api.models import CustomUser
from .forms import CustomUserRegistrationForm
from .serializers import CustomUserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
import logging


#########################################

# # For user registration

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





# @csrf_exempt
def signInUser(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			print(data) # DEBUG
			username = data.get('username')
			password = data.get('password')
			print(f'username: {username}, password: {password}') # DEBUG

			# Authenticate the user
			# check_password = check_password(password)
			user = authenticate(request, username=username, password=password)
			print(f'Authenticated user: {user}') # DEBUG

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




# Sends to the frontend the profile of the currently authenticated user
class UserProfileView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserRegistrationSerializer

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
	
