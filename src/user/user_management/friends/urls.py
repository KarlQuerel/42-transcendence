from django.urls import path
from .views import SendFriendRequestView, AcceptFriendRequestView, RejectFriendRequestView, RemoveFriendView, SentFriendRequestView, ReceivedFriendRequestView

urlpatterns = [
	path('send-friend-request/', SendFriendRequestView.as_view(), name='send_friend_request'),
	path('accept-request/<int:request_id>/', AcceptFriendRequestView.as_view(), name='accept_friend_request'),
	path('reject-request/<int:request_id>/', RejectFriendRequestView.as_view(), name='reject_friend_request'),
	path('remove-friend/<int:user_id>', RemoveFriendView.as_view(), name='remove_friend'),
	path('sent-requests/', SentFriendRequestView.as_view(), name='sent_requests'),
	path('received-requests/', ReceivedFriendRequestView.as_view(), name='received_requests'),
]