from django.urls import path, include
from . import views
# from api.views import CustomUserAPIView

urlpatterns = [
	path('addUser/', views.addUser, name='add-user'),
    path('signInUser/', views.signInUser, name='sign-in-user'),
    path('sign-up/', views.addUser, name='sign-up'),
    path('currentlyLoggedInUser/', views.currentlyLoggedInUser, name='currently-logged-in-user'),
	path('friends/', include('friends.urls')),
]
