from django.urls import path
from . import views

urlpatterns = [
    path('homeposts/', views.home_posts, name='model-upload'),
    path('newexplore/', views.new_explore_posts, name='model-upload'),
    path('topexplore/', views.top_explore_posts, name='model-upload'),
    path('videoexplore/', views.video_explore_posts, name='model-upload'),
    path('imageexplore/', views.image_explore_posts, name='model-upload'),
    path('textexplore/', views.text_explore_posts, name='model-upload'),
    path('audioexplore/', views.audio_explore_posts, name='model-upload'),
]
