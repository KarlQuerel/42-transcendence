from django.shortcuts import render

def test_2(request):
	return render(request, 'test_app_2/index.html')
