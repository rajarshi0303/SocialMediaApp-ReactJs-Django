from django.urls import path
from . import views

urlpatterns = [
    path('postads/', views.post_ads, name='model-upload'),
    path('ads/', views.ads, name='model-upload'),
    path('adsclick/', views.ads_click, name='model-upload'),
    path('myads/', views.my_ads, name='model-upload'),
    path('adsdata/', views.ads_data, name='model-upload'),
    path('editads/', views.edit_ads, name='model-upload'),
    path('deleteads/', views.delete_ads, name='model-upload'),
]