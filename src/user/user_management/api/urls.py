from django.urls import path
from . import views
# from api.views import CustomUserAPIView

urlpatterns = [
	# path('', views.getData),
	# path('add/', views.addUser),
	# path('', CustomUserAPIView.as_view()),
	path('check-email/', views.check_existing_email, name='api_checkmail'),
	path('check-username/', views.check_existing_username, name='api_checkusername'),
]