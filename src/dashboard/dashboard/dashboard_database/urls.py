from django.contrib import admin
from django.urls import path
from django.urls import include
from django_prometheus import exports

urlpatterns = [
	path('api/', include('api_dashboard.urls')),
	path('api/dashboard/', include('api_dashboard.urls')), #"dashboard" : dans nginx file
	path('metrics/', exports.ExportToDjangoView, name='metrics')
]