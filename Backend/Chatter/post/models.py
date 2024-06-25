from django.db import models
from sign_up.models import User


class Post(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150)
    profile_image = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    hashtag =  models.CharField(max_length=150,null=True,db_index=True)
    text = models.TextField(null=True)
    image = models.ImageField(upload_to='images/', null=True)
    video = models.FileField(upload_to='videos/', null=True)
    audio = models.FileField(upload_to='audio/', null=True)
    privacy = models.CharField(max_length=20)
    stars = models.DecimalField(max_digits=3, decimal_places=2,default=0,null=True)
    link = models.URLField(null=True)
    post_datetime = models.DateTimeField(auto_now_add=True,db_index=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Hashtag(models.Model):
    id = models.BigAutoField(primary_key=True)
    hashtag =  models.CharField(max_length=150,null=True,db_index=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class HashtagList(models.Model):
    hashtag = models.CharField(max_length=150, unique=True, primary_key=True)
    count = models.IntegerField(default=0)
