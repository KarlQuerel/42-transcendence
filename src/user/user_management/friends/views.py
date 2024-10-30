from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api_user.models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from .models import FriendRequest
from .serializers import FriendRequestSerializer
from django.db.models import Q
from django.views.decorators.csrf import csrf_protect

@method_decorator(permission_classes([IsAuthenticated]), name='dispatch')
@method_decorator(login_required, name='dispatch')
class SendFriendRequestView(APIView):
	def post(self, request):
		if requestAlreadySent(request) == True:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)	
		serializer = FriendRequestSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save(sender=request.user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def requestAlreadySent(request):
	try:
		other_user = CustomUser.objects.get(id=request.data.get('receiver'))
		friend_request = FriendRequest.objects.get(sender=other_user, receiver=request.user, request_status='pending')
		return True
	except FriendRequest.DoesNotExist:
		try:
			friend_request = FriendRequest.objects.get(sender=other_user, receiver=request.user, request_status='accepted')
			return True
		except FriendRequest.DoesNotExist:
			try:
				friend_request = FriendRequest.objects.get(sender=request.user, receiver=other_user, request_status='pending')
				return True
			except FriendRequest.DoesNotExist:
				try:
					friend_request = FriendRequest.objects.get(sender=request.user, receiver=other_user, request_status='accepted')
					return True
				except FriendRequest.DoesNotExist:
					return False

@method_decorator(permission_classes([IsAuthenticated]), name='dispatch')
@method_decorator(login_required, name='dispatch')
class AcceptFriendRequestView(APIView):
	def post(self, request, request_id):
		try:
			friend_request = FriendRequest.objects.get(pk=request_id, receiver=request.user, request_status='pending')
			friend_request.accept()
			friend_request.save()
			return Response({'status': 'friend request accepted'}, status=status.HTTP_200_OK)
		except FriendRequest.DoesNotExist:
			return Response({'error': 'friend request not found or already accepted'}, status=status.HTTP_404_NOT_FOUND)

@method_decorator(permission_classes([IsAuthenticated]), name='dispatch')
@method_decorator(login_required, name='dispatch')
class RejectFriendRequestView(APIView):
	def post(self, request, request_id):
		try:
			friend_request = FriendRequest.objects.get(pk=request_id, receiver=request.user, request_status='pending')
			friend_request.reject()
			friend_request.save()
			return Response({'status': 'friend request rejected'}, status=status.HTTP_200_OK)
		except FriendRequest.DoesNotExist:
			return Response({'error': 'friend request not found or already rejected'}, status=status.HTTP_404_NOT_FOUND)

@method_decorator(permission_classes([IsAuthenticated]), name='dispatch')
@method_decorator(login_required, name='dispatch')
class RemoveFriendView(APIView):
	def post(self, request, user_id):
		try:
			try:
				friend_request = FriendRequest.objects.get(sender=request.user, request_status='accepted')
				friend_request.remove_friend()
			except:
				friend_request = FriendRequest.objects.get(receiver=request.user, request_status='accepted')
				friend_request.remove_friend()
			friend_to_remove = CustomUser.objects.get(id=user_id)
			request.user.friends.remove(friend_to_remove)
			friend_to_remove.friends.remove(request.user)
			return Response({'status': 'friend removed from list'}, status=status.HTTP_200_OK)
		except CustomUser.DoesNotExist:
			return Response({'error': 'user does not exist'}, status=status.HTTP_404_NOT_FOUND)

@method_decorator(permission_classes([IsAuthenticated]), name='dispatch')
@method_decorator(login_required, name='dispatch')
class FriendRequestStatus(APIView):
	def get(self, request, user_id):
		try:
			other_user = CustomUser.objects.get(id=user_id)
			friend_request = FriendRequest.objects.get(sender=other_user, receiver=request.user, request_status='pending')
			return Response({'respond_to_request'}, status=status.HTTP_200_OK)
		except FriendRequest.DoesNotExist:
			try:
				friend_request = FriendRequest.objects.get(sender=request.user, receiver=other_user, request_status='pending')
				return Response({'waiting_for_response'}, status=status.HTTP_200_OK)
			except FriendRequest.DoesNotExist:
				return Response({'error': 'friend request not found or already rejected'}, status=status.HTTP_200_OK)

@method_decorator(permission_classes([IsAuthenticated]), name='dispatch')
@method_decorator(login_required, name='dispatch')
class FriendRequestID(APIView):
	def get(self, request, user_id):
		try:
			other_user = CustomUser.objects.get(id=user_id)
			friend_request = FriendRequest.objects.get(sender=other_user, receiver=request.user, request_status='pending')
			return Response({friend_request.id}, status=status.HTTP_200_OK)
		except FriendRequest.DoesNotExist:
				return Response({'error': 'friend request not found or already rejected'}, status=status.HTTP_200_OK)


@csrf_protect
class DeleteInactiveUsersFriendRequests(APIView):
	def delete(self, request):
		try:
			usersToDeleteID = request.data.get('inactiveUsersID', [])
			if isinstance(usersToDeleteID, str):
				try:
					usersToDeleteID = [int(id) for id in usersToDeleteID.split(",")]
				except ValueError:
					return Response({'error': 'Invalid user ID format'}, status=status.HTTP_400_BAD_REQUEST)
				
			if not usersToDeleteID:
				return Response({'error': 'No matching users found'}, status=status.HTTP_400_BAD_REQUEST)

			friendRequests = FriendRequest.objects.filter(Q(sender_id__in=usersToDeleteID) | Q(receiver_id__in=usersToDeleteID))
			friendRequests.delete()

			return Response({'success': 'friend requests deleted successfully'}, status=status.HTTP_200_OK)

		except:
			return Response({'error': 'no user id provided'}, status=status.HTTP_400_BAD_REQUEST)





# class SentFriendRequestView(APIView):
# 	def get(self, request):
# 		queryset = FriendRequest.objects.filter(sender=request.user, request_status='pending')
# 		serializer = FriendRequestSerializer(queryset, many=True)
# 		return Response(serializer.data, status=status.HTTP_200_OK)

# class ReceivedFriendRequestView(APIView):
# 	def get(self, request):
# 		queryset = FriendRequest.objects.filter(receiver=request.user, request_status='pending')
# 		serializer = FriendRequestSerializer(queryset, many=True)
# 		return Response(serializer.data, status=status.HTTP_200_OK)
