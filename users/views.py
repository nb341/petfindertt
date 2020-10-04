from django.contrib.auth import login, authenticate
from .models import User
from django.shortcuts import render, redirect
from django.http import JsonResponse

# Create your views here.
def home(request):
    context ={}
    context["val"] = [1,2,3,4,5,6,7,8,9,10]
    return render(request, "home.html", context)

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
                    user.save()
                    return JsonResponse({'success':True})


        else:
            pass

        print(fname, lname, uname, email, contact, gender, pass1, pass2, propic)
        return JsonResponse({'name': fname+" "+lname})
    else:
        return render(request, 'signup.html')
