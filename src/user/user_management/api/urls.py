from django.urls import path
from . import views
from .views import UserProfileView

urlpatterns = [
	path('', views.getData),
	path('add/', views.addUser),
    path('api/profile/', UserProfileView.as_view(), name='user-profile'),
]
