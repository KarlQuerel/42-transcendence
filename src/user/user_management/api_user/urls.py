from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	path('addUser/', views.addUser, name='add-user'),
    path('signInUser/', views.signInUser, name='sign-in-user'),
    path('sign-up/', views.addUser, name='sign-up'),
    path('currentlyLoggedInUser/', views.currentlyLoggedInUser, name='currently-logged-in-user'),
	path('friends/', include('friends.urls')),
    path('getUsername/', views.getUsername, name='get-username'),
    path('changePassword/', views.changePassword, name='change-password'),
    path('checkAuthentication/', views.checkAuthentication, name='check-authentication'),
    path('verifyPassword/', views.verifyPassword, name='verify-password'),
    path('hashAndChangePassword/', views.hashAndChangePassword, name='hash-and-change-password'),
    path('updateProfile/', views.updateProfile, name='update-profile'),
    path('getAllUserAvatars/', views.getAllUserAvatars, name='get-all-user-avatars'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)