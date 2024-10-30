from django.urls import path
from .views import SendFriendRequestView, AcceptFriendRequestView, RejectFriendRequestView, RemoveFriendView, FriendRequestStatus, FriendRequestID, DeleteInactiveUsersFriendRequests

urlpatterns = [
	path('send-friend-request/', SendFriendRequestView.as_view(), name='send_friend_request'),
	path('accept-request/<int:request_id>/', AcceptFriendRequestView.as_view(), name='accept_friend_request'),
	path('reject-request/<int:request_id>/', RejectFriendRequestView.as_view(), name='reject_friend_request'),
	path('remove-friend/<int:user_id>/', RemoveFriendView.as_view(), name='remove_friend'),
	path('friend-request-status/<int:user_id>/', FriendRequestStatus.as_view(), name='friend_request_status'),
	path('friend-request-id/<int:user_id>/', FriendRequestID.as_view(), name='friend_request_id'),
	path('DeleteInactiveUsersFriendRequests/', DeleteInactiveUsersFriendRequests.as_view(), name='delete_friend_requests'),
	# path('sent-requests/', SentFriendRequestView.as_view(), name='sent_requests'),
	# path('received-requests/', ReceivedFriendRequestView.as_view(), name='received_requests'),
]
