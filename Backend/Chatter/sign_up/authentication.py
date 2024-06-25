from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from .models import User

class CustomUserBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        user = User.objects.only('username', 'password', 'id').filter(username=username).first()
        if user and check_password(password, user.password):
            return user
        return None