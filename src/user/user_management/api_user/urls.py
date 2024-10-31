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
	path('getFriendAvatar/<int:user_id>/', views.getFriendAvatar, name='get-friend-avatar'),
	path('getUsername/', views.getUsername, name='get-username'),
	path('does-user-exist/<str:username>/', views.doesUserExist, name='does_user_exist'),
	path('other-users-list/', views.otherUsersList, name='other_users_list'),
	path('verify-2fa-code/', views.verify_2fa_code, name='verifiy_2fa_code'),
	path('resend-2fa-code/', views.resend_2fa_code, name='resend_2fa_code'),
	path('loggout-user/', views.loggout_user, name='loggout_user'),
	path('changePassword/', views.changePassword, name='change-password'),
	path('checkAuthentication/', views.checkAuthentication, name='check-authentication'),
	path('verifyPassword/', views.verifyPassword, name='verify-password'),
	path('hashAndChangePassword/', views.hashAndChangePassword, name='hash-and-change-password'),
	path('updateProfile/', views.updateProfile, name='update-profile'),
	path('updateAvatar/', views.updateAvatar, name='update-avatar'),
	path('getAllUsers/', views.getAllUsers, name='get-all-users'),
	path('checkUserPassword/', views.checkUserPassword, name='check-user-password'),
	path('send-infos-to-user/', views.send_user_informations, name='send_infos_to_user'),
    path('anonymizeUserData/', views.anonymizeUserData, name='anonymize-user-data'),
    path('updateAnonymousStatus/', views.updateAnonymousStatus, name='update-anonymous-status'),
    path('getAnonymousStatus/', views.getAnonymousStatus, name='get-anonymous-status'),
    path('get2FAStatus/', views.get2FAStatus, name='get-2fa-status'),
    path('update2FAStatus/', views.update2FAStatus, name='update-2fa-status'),
	path('getInactiveUsersID/', views.getInactiveUsersID, name='get-inactive-users-id'),
	path('deleteInactiveUsersFriends/', views.deleteInactiveUsersFriends, name='delete-inactive-users-friends'),
	path('deleteUserFriendships/', views.deleteUserFriendships, name='delete-user-friendships'),
	path('deleteUser/', views.deleteUser, name='delete-user'),
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)