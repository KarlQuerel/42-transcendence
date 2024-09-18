from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import CustomUser
from .models import FriendRequest
from .serializers import FriendRequestSerializer

class SendFriendRequestView(APIView):
	def post(self, request):
		serializer = FriendRequestSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save(sender=request.user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AcceptFriendRequestView(APIView):
	def post(self, request, request_id):
		try:
			friend_request = FriendRequest.objects.get(pk=request_id, receiver=request.user, request_status='pending')
			friend_request.request_status = 'accepted'
			friend_request.save()
			return Response({'status': 'friend request accepted'}, status=status.HTTP_200_OK)
		except FriendRequest.DoesNotExist:
			return Response({'error': 'friend request not found or already accepted'}, status=status.HTTP_404_NOT_FOUND)

class RejectFriendRequestView(APIView):
	def post(self, request, request_id):
		try:
			friend_request = FriendRequest.objects.get(pk=request_id, receiver=request.user, request_status='pending')
			friend_request.request_status = 'rejected'
			friend_request.save()
			return Response({'status': 'friend request rejected'}, status=status.HTTP_200_OK)
		except FriendRequest.DoesNotExist:
			return Response({'error': 'friend request not found or already rejected'}, status=status.HTTP_404_NOT_FOUND)

class RemoveFriendView(APIView):
	def post(self, request, user_id):
		try:
			friend_to_remove = CustomUser.objects.get(id=user_id)
			request.user.friends.remove(friend_to_remove)
			friend_to_remove.friends.remove(request.user)
			return Response({'status': 'friend removed from list'}, status=status.HTTP_200_OK)
		except CustomUser.DoesNotExist:
			return Response({'error': 'user does not exist'}, status=status.HTTP_404_NOT_FOUND)

class SentFriendRequestView(APIView):
	def get(self, request):
		queryset = FriendRequest.objects.filter(sender=request.user, request_status='pending')
		serializer = FriendRequestSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

class ReceivedFriendRequestView(APIView):
	def get(self, request):
		queryset = FriendRequest.objects.filter(receiver=request.user, request_status='pending')
		serializer = FriendRequestSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
