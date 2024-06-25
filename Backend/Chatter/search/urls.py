from django.urls import path
from . import views

urlpatterns = [
    path('user_search/', views.user_search_view, name='user_search'),
    path('follow/', views.follow, name='user_search'),
    path('friend/', views.friend, name='user_search'),
    path('followers/', views.follower, name='user_search'),
    path('followings/', views.followings, name='user_search'),
    path('unfollow/', views.un_follow, name='user_search'),
    path('usersuggestion/', views.user_suggestion, name='user_search'),
]
