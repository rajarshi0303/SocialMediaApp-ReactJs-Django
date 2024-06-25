from django.db import models
from sign_up.models import User
# Create your models here.
class ChatRoom(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True,db_index=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received')


class Message(models.Model):
    id = models.BigAutoField(primary_key=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True,db_index=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='room')
    