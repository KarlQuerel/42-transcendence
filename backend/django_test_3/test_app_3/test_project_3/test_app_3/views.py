from django.shortcuts import render

def test_3(request):
	return render(request, 'test_app_3/index.html')