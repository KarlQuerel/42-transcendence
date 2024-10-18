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
    path('verify-2fa-code/', views.verify_2fa_code, name='verifiy_2fa_code'),
    path('resend-2fa-code/', views.resend_2fa_code, name='resend_2fa_code'),
    path('changePassword/', views.changePassword, name='change-password'),
    path('checkAuthentication/', views.checkAuthentication, name='check-authentication'),
    path('verifyPassword/', views.verifyPassword, name='verify-password'),
    path('hashAndChangePassword/', views.hashAndChangePassword, name='hash-and-change-password'),
    path('updateProfile/', views.updateProfile, name='update-profile'),
    path('updateAvatar/', views.updateAvatar, name='update-avatar'),
    path('getAllUserAvatars/', views.getAllUserAvatars, name='get-all-user-avatars'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)