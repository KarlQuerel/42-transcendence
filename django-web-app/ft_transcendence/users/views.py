from django.http import HttpResponse
from django.shortcuts import render
from users.models import User
from django.urls import reverse



def hello(request):
    return HttpResponse('<h1>Hello User!</h1>')

def about(request):
    return HttpResponse('<h1>Learn more about us</h1> <p>   Nous sommes un groupe d\'etudiants de 42:</p> <ul><li>casomarr</li><li>cbernaze</li><li>kquerel</li><li>madavid</li><li>jrouillo</li><ul>')

def profile(request):
    users = User.objects.all()
    return HttpResponse('<h1>Welcome to your profile</h1>')

def login(request):
    return render(request, 'users/login.html')

def logMeIn(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return render(request, 'users/play.html')
        else:
            return HttpResponse("Invalid username or password.")
    else:
        return render(request, 'users/login.html')