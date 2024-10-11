from django.urls import path, include
from . import views

urlpatterns = [
	path('addUser/', views.addUser, name='add-user'),
    path('signInUser/', views.signInUser, name='sign-in-user'),
    path('sign-up/', views.addUser, name='sign-up'),
    path('currentlyLoggedInUser/', views.currentlyLoggedInUser, name='currently-logged-in-user'),
	path('friends/', include('friends.urls')),
    path('getUsername/', views.getUsername, name='get-username'),
    path('verify-2fa-code/', views.verify_2fa_code, name='verifiy_2fa_code'),
    path('resend-2fa-code/', views.resend_2fa_code, name='resend_2fa_code'),
]
