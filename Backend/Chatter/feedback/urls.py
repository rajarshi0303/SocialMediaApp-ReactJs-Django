from django.urls import path
from . import views

urlpatterns = [
    path('addrating/', views.add_rating, name='model-upload'),
    path('viewrating/', views.view_rating, name='model-upload'),
    path('addfeedback/', views.add_feedback, name='model-upload'),
    path('viewfeedback/', views.view_feedback, name='model-upload'),
    path('addlike/', views.add_like, name='model-upload'),
    path('addreply/', views.add_reply, name='model-upload'),
    path('viewreply/', views.view_reply, name='model-upload'),
]