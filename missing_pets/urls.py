from django.urls import path

from . import views


urlpatterns = [
    path('post-missing-pet/', views.postmissingpet_view, name="postmissingpets"),
]