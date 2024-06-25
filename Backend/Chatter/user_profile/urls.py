from django.urls import path
from . import views

urlpatterns = [
    path('userprofile/', views.user_info, name='userprofile'),
    path('logout/', views.logout, name='logout'),
    path('editprofile/', views.edit_user_info, name='editprofile'),
    path('editusername/', views.edit_username, name='editusername'),
    path('changepassword/', views.change_password, name='changepassword'),
    path('changeemail/', views.change_email, name='changeemail'),

]
