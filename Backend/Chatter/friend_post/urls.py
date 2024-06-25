from django.urls import path
from . import views

urlpatterns = [
    path('friendposts/', views.friend_posts, name='model-upload'),
    path('sharedpost/<int:post_id>/', views.shared_post_view, name='shared-post'),
]