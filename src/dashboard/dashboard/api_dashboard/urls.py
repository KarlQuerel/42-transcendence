from django.urls import path
from . import views

urlpatterns = [
	path('dashboard/addStats/', views.addStats, name='add-stats'),
	path('dashboard/getGameHistory/', views.getGameHistory, name='get-match-history'),
]