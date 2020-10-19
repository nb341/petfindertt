from .models import User, FeedFile
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from posts.models import MissingPets
from datetime import datetime, timezone
import math

# Create your views here.
def home(request):
    mp = MissingPets.objects.all()
    print(mp)
    val = {'mp':mp}
    li = []
    for i in val['mp']:
       now = datetime.now(timezone.utc)
       d = now - i.post_time

       days = math.floor(d.days)
       hours = math.floor(d.seconds/(60*60))
       #hours = tmp/(3600)
      # minutes = tmp%3600
       i.post_time = str(days)+" days and "+str(hours)+" hours ago"

    return render(request, "home.html", val)

def checkUser(request):

    uname_ = request.GET.get('uname_',None)
    u = {'available' : not User.objects.filter(username=uname_).exists()}
    print("It WORKS")
    return JsonResponse(u)

def signup(request):

    if request.method=='POST':
        data = {}
        ust = request.POST['user_option']
        fname = request.POST['fname_']
        lname = request.POST['lname_']
        uname = request.POST['uname_']
        email = request.POST['email_']
        contact = request.POST['phone_']
        gender = request.POST['inlineRadioOptions']
        pass1 = request.POST['pass']
        pass2 = request.POST['r_pass']
        propic = request.FILES['pro_picture']
        certs = request.FILES.getlist('certs')

        if pass1==pass2:
            if User.objects.filter(username=uname).exists():
                data['username'] = False
                return JsonResponse(data)
            else:
                if User.objects.filter(email=email):
                    data['email'] = False
                    return JsonResponse(data)
                else:
                    usts = ('Pet Owner', 'Volunteer', 'Shelter','Rescuer', 'Veterinarian')
                    user = User.objects.create_user(email=email,username=uname, password=pass1)
                    if ust == usts[0]:
                        user.is_pet_owner = True
                    if ust == usts[1]:
                        user.is_volunteer = True
                    if ust == usts[2]:
                        user.is_shelter = True
                    if ust == usts[3]:
                        user.is_rescuer = True
                    if ust == usts[4]:
                        user.is_vet = True
                    if propic:
                        user.pro_pic = propic
                    for c in certs:
                        f = FeedFile.objects.create(file=c, user_id=user)
                        user.certificates.add(f)
                        print(user.id)
                        f.save()
                    user.save()

                    user = authenticate(request, username=uname, password=pass1)
                    return JsonResponse({'success':True})


        else:
            pass

        print(fname, lname, uname, email, contact, gender, pass1, pass2, propic)
        return JsonResponse({'name': fname+" "+lname})
    else:
        return render(request, 'signup.html')

def login_view(request):
    if request.method=="POST":
        username = request.POST['username']
        password = request.POST['password']
        print(username, password)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request,user)
            return JsonResponse({'success':True})
        else:
        # Return an 'invalid login' error message.
            return JsonResponse({'success':False})

def logout_view(request):
    logout(request)
    # Redirect to a success page.
    return redirect('index')


def server_error(request):
    return render(request, '404.html')

def not_found(request, exception):
    return render(request, '404.html')

def permission_denied(request, exception):
    return render(request, '404.html')

def bad_request(request, exception):
    return render(request, '404.html')
