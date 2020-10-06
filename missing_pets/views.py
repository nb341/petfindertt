from django.shortcuts import render, redirect
from django.http import JsonResponse
# Create your views here.

def postmissingpet_view(request):
    return render(request, 'missingpets/postmissingpets.html')