from django.urls import path
from . import views

""" urlpatterns = [
	path('api/getData/', views.getData, name='get_data'),
	path('add/', views.addStats),
	path('', views.getData),
] """


urlpatterns = [
	path('getData/', views.getData, name='get-data'),
	path('addStats/', views.addStats, name='add-stats'),
]