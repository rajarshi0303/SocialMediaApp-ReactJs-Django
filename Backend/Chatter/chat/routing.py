from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from chat.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'chat/(?P<chat_box_name>\w+)', ChatConsumer.as_asgi()),
]