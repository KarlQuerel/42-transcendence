from django.urls import path
from . import views

urlpatterns = [
	path('dashboard/addStats/', views.addStats, name='add-stats'),
	path('dashboard/getGameHistory/', views.getGameHistory, name='get-match-history'),
	path('dashboard/anonymiseGameHistory/', views.anonymiseGameHistory, name='anonymise-game-history'),
	path('dashboard/deleteGameHistory/', views.deleteGameHistory, name='delete-game-history'),
	path('dashboard/deleteGameHistoryInactiveUsers/', views.deleteGameHistoryInactiveUsers, name='delete-game-history-inactive-users'),
]