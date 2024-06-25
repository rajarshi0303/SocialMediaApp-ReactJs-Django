from django.urls import path
from . import views

urlpatterns = [
    path('addpost/', views.add_post, name='model-upload'),
    path('userposts/', views.user_posts, name='model-upload'),
    path('deleteposts/', views.delete_post, name='model-upload'),
    path('postdata/', views.post_data, name='model-upload'),
    path('editpost/', views.edit_post, name='model-upload'),
]
