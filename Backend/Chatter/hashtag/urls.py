from django.urls import path
from . import views

urlpatterns = [
   path('hashtag/', views.hashtag, name='model-upload'),
    path('searchhashtag/', views.hashtag_search, name='model-upload'),
    path('followhashtag/', views.follow_hashtag, name='model-upload'),
    path('unfollowhashtag/', views.un_follow_hashtag, name='model-upload'),
    path('hashtagsuggestion/', views.hashtag_suggestion, name='model-upload'),
]