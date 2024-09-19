from django.urls import path
from . import views

""" urlpatterns = [
	path('api/getData/', views.getData, name='get_data'),
	path('add/', views.addStats),
	path('', views.getData),
] """

urlpatterns = [
	path('dashboard/getData/', views.getData, name='get-data'),
	path('dashboard/addStats/', views.addStats, name='add-stats'),
    # path('users/getUsername/', views.getUsername, name='get-username'), #TEST
]