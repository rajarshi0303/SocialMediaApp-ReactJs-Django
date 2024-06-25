from django.db import models

class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150, db_index=True,unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField(db_index=True,unique=True)
    profile_image=models.CharField(max_length=150)
    bio=models.CharField(max_length=200)
    link = models.URLField(null=True)
    follower_count = models.IntegerField(default=0, null=True)
    following_count = models.IntegerField(default=0, null=True)
    post_count = models.IntegerField(default=0, null=True)
    
class OTPVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)

class ContactUs(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()