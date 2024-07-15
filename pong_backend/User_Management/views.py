### Ajout pour API ###

from django.shortcuts import render, redirect
from django.contrib.auth import login
from User_Management.forms import RegisterForm

def register(request):
  if request.method == 'POST':
    form = RegisterForm(request.POST)
    if form.is_valid():
        user = form.save()
        login(request, user)
        return redirect('home')  # Redirect to a success page
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})

### Ajout pour API ###