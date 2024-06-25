from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('forgetpassword/', views.forgerpassword, name='forgetpassword'),
    path('verifyotp/', views.otpverification, name='forgetpassword'),
    path('resetpassword/', views.resetpassword, name='resetpassword'),
    path('contactus/', views.contactus, name='contactus'),

    # Endpoint to obtain access token with provided credentials
    path('api/token/', views.login, name='login'),
]
