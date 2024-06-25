from django.db import models
from post.models import Post
from sign_up.models import User


class Rating(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150)
    profile_image = models.CharField(max_length=200, null=True)
    rating = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True,db_index=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Feedback(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150)
    profile_image = models.CharField(max_length=200, null=True)
    feedback = models.TextField(null=True)
    like_count = models.IntegerField(default=0,null=True)
    dislike_count = models.IntegerField(default=0,null=True)
    created_at = models.DateTimeField(auto_now_add=True,db_index=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Like(models.Model):
    id = models.BigAutoField(primary_key=True)
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Reply(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150)
    profile_image = models.CharField(max_length=200, null=True)
    reply = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True,db_index=True)
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)