from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import CustomUser, FriendRequest

class FriendRequestTestCase(TestCase):
	def setUp(self):
		# Crée des utilisateurs pour les tests
		self.user1 = CustomUser.objects.create(username='karl', display_name='Karlo', email='karl@example.com')
		self.user2 = CustomUser.objects.create(username='jess', display_name='Jessy', email='jess@example.com')
		self.user3 = CustomUser.objects.create(username='caro', display_name='Carolina', email='caro@example.com')
	
		# Authentifie les utilisateurs
		self.client = APIClient()

	def test_send_friend_request(self):
		self.client.force_authenticate(user=self.user1)
		url = reverse('send_friend_request')
		response = self.client.post(url, {'receiver': self.user2.id})
		print("Status code for send request:", response.status_code)
		print("Response data for send request:", response.data)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

	def test_accept_friend_request(self):
		self.client.force_authenticate(user=self.user3)
		self.friend_request = FriendRequest.objects.create(sender=self.user1, receiver=self.user3, request_status='pending')
		url = reverse('accept_friend_request', kwargs={'request_id': self.friend_request.id})
		response = self.client.post(url)
		print("Status code for accept request:", response.status_code)
		print("Response data for accept request:", response.data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_reject_friend_request(self):
		self.client.force_authenticate(user=self.user3)
		self.friend_request = FriendRequest.objects.create(sender=self.user1, receiver=self.user3, request_status='pending')
		url = reverse('reject_friend_request', kwargs={'request_id': self.friend_request.id})
		response = self.client.post(url)
		print("Status code for reject request:", response.status_code)
		print("Response data for reject request:", response.data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_remove_friend(self):
		self.client.force_authenticate(user=self.user1)
		self.user1.friends.add(self.user3)
		url = reverse('remove_friend', kwargs={'user_id': self.user3.id})
		response = self.client.post(url)
		print("Status code for remove friend:", response.status_code)
		print("Response data for remove friend:", response.data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertNotIn(self.user3, self.user1.friends.all())

	def test_sent_requests(self):
		self.client.force_authenticate(user=self.user1)
		self.friend_request = FriendRequest.objects.create(sender=self.user1, receiver=self.user3, request_status='pending')
		self.friend_request = FriendRequest.objects.create(sender=self.user1, receiver=self.user2, request_status='pending')
		url = reverse('sent_requests')
		response = self.client.get(url)
		print("Status code for sent requests:", response.status_code)
		print("Response data for sent requests:", response.data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_received_requests(self):
		self.client.force_authenticate(user=self.user3)
		self.friend_request = FriendRequest.objects.create(sender=self.user1, receiver=self.user3, request_status='pending')
		self.friend_request = FriendRequest.objects.create(sender=self.user2, receiver=self.user3, request_status='pending')
		url = reverse('received_requests')
		response = self.client.get(url)
		print("Status code for received requests:", response.status_code)
		print("Response data for received requests:", response.data)
		url = reverse('accept_friend_request', kwargs={'request_id': self.friend_request.id})
		response = self.client.post(url)
		print("Status code for received2 requests:", response.status_code)
		print("Response data for received2 requests:", response.data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
