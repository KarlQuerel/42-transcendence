from django.urls import path
from . import views
# from api.views import CustomUserAPIView

urlpatterns = [
	# path('', views.getData),
	path('addUser/', views.addUser, name='add-user'),
	# path('', CustomUserAPIView.as_view()),
	path('check-email/', views.check_existing_email, name='check-email'),
	path('check-username/', views.check_existing_username, name='check-username'),
    path('login/', views.addUser, name='login'),
]
