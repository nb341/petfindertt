from django.http import HttpResponse

# Create your views here.
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import MissingPets, Images
from users.models import User



# Create your views here.


def postmissingpet_view(request):
    if request.user:
        if request.method == "POST":
            pet_name = request.POST['pet_name']
            a_type = request.POST['a_type']
            breed = request.POST['breed']
            pd = request.POST['pet_description']
            mi = request.FILES['main_image']
            imgs = request.FILES.getlist('images')
            address = request.POST['address']
            lat = request.POST['lat']
            lng = request.POST['long']

            mp = MissingPets.objects.create(name=pet_name, atype=a_type, breed=breed,
                                        desc=pd, lat=lat, lng=lng,
                                        translated_add=address, user_id=request.user,
                                        pic=mi
            )

            for img in imgs:
                i = Images.objects.create(img=img, user_id=request.user)
                i.missing_pets_id = mp
                i.save()
            mp.save()


            return render(request, 'missingpets/postmissingpets.html', {'val':mp.save()})
    else:
        HttpResponse('suck it')


    return render(request, 'missingpets/postmissingpets.html')

def view_missing_pet(request, pk):
    mp = get_object_or_404(MissingPets, pk=pk)
    img = Images.objects.all().filter(missing_pets_id=pk)
    return render(request,'missingpets/viewmore.html', {'mp':mp,'img':img})

def update_missing_pet(request, pet_id):
    mp = get_object_or_404(MissingPets, pk=pet_id)
    user = User.objects.get(email=mp.user_id)
    if request.method == "POST":
        pass
    return render(request, 'missingpets/update.html', {'mp':mp, 'owner':user})
