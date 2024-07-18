from django.shortcuts import render

def test_1(request):
	return render(request, 'test_app_1/index.html')