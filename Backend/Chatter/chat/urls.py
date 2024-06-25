from django.urls import path
from . import views

urlpatterns = [
    path('createroom/', views.create_room, name='model-upload'),
    path('chatroom/', views.chat_room, name='model-upload'),
]