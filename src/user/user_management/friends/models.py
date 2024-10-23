from django.db import models
from api_user.models import CustomUser
#a recuperer sur phind
class FriendRequest(models.Model):
	sender = models.ForeignKey(CustomUser, related_name='friend_request_sent', on_delete=models.CASCADE)
	receiver = models.ForeignKey(CustomUser, related_name='friend_request_received', on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True, null=True)
	request_status = models.CharField(max_length=20, choices=[
		('pending', 'PENDING'),
		('accepted', 'ACCEPTED'),
		('rejected', 'REJECTED'),
		('friendship_ended', 'FRIENDSHIP_ENDED'),
	], default='pending')

	def accept(self):
		self.request_status = 'accepted'
		self.receiver.friends.add(self.sender)
		self.sender.friends.add(self.receiver)
		self.save()

	def reject(self):
		self.request_status = 'rejected'
		self.save()

	def remove_friend(self):
		self.request_status = 'friendship_ended'
		self.save()

	def __str__(self):
		return f"{self.sender.username} sent a friend request to {self.receiver.username}"