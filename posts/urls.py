from django.urls import path

from . import views


urlpatterns = [
    path('post-missing-pet/', views.postmissingpet_view, name="postmissingpets"),
    path('post/view/<int:pk>/', views.view_missing_pet,name='view_post'),
    path('post/update/<int:pet_id>/', views.update_missing_pet, name='update_post')
]

