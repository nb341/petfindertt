from django.urls import path

from . import views

urlpatterns = [
    path('',views.home, name='index'),
    path('sign-up/', views.signup, name='sign_up'),
    path('checkUser/', views.checkUser, name='checkUser'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
