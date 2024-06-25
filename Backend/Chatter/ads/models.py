from django.db import models
from sign_up.models import User
# Create your models here.

class AdsPost(models.Model):
    id = models.BigAutoField(primary_key=True)
    brandname = models.CharField(max_length=150,null=True)
    description = models.TextField(null=True)
    hashtag =  models.CharField(max_length=150,null=True,db_index=True)
    text = models.TextField(null=True)
    image = models.ImageField(upload_to='AdsImages/', null=True)
    video = models.FileField(upload_to='AdsVideos/', null=True)
    audio = models.FileField(upload_to='AdsAudio/', null=True)
    plan = models.CharField(max_length=15,null=True,db_index=True)
    status = models.CharField(max_length=15,null=True,db_index=True)
    link = models.URLField(null=True)
    views = models.IntegerField(default=0, null=True,db_index=True)
    clicks = models.IntegerField(default=0, null=True)
    post_datetime = models.DateTimeField(db_index=True,null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)