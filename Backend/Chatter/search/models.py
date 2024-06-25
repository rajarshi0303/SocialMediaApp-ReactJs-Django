from django.db import models
from sign_up.models import User

# Create your models here.
class Followers(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)
    friend_id = models.BigIntegerField(db_index=True,null=True) 