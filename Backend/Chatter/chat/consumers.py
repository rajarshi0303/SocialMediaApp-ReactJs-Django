import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import ChatRoom
from asgiref.sync import sync_to_async
from django.db.models import Q
from .models import Message
from django.utils import timezone
from django.db import transaction
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        # Accept the WebSocket connection
        self.chat_box_name = self.scope["url_route"]["kwargs"]["chat_box_name"]
        self.room_group_name = "chat_%s" % self.chat_box_name
        self.room_id = int(self.chat_box_name)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        chat_room = await sync_to_async(ChatRoom.objects.get)(id=self.room_id)
        print(chat_room.sender_id, chat_room.receiver_id)
        
        messages = await sync_to_async(
            lambda: list(
                Message.objects.filter(room_id=chat_room.id).order_by('created_at').values('sender_id', 'message')
            )
        )()

        await self.send(text_data=json.dumps({
            "type": "chat",
            "message": messages,
        }))
        chat_room.created_at = timezone.now()
        await sync_to_async(chat_room.save)()
        
    async def receive(self, text_data):
        # Handle incoming messages
        # You can access the received message through the `text_data` parameter
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender_id = text_data_json['sender_id']
        receiver_id = text_data_json['receiver_id']
        print(message,sender_id)
        print(self.room_id)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat_message',
                'message':message,
                'sender_id': sender_id,
                'receiver_id': receiver_id
            }
        )
    
        # Get the count of messages with the same receiver_id and sender_id
        message_count = await sync_to_async(Message.objects.filter(
            room_id=self.room_id
        ).count)()
        print("Number of messages with the same receiver_id and sender_id:", message_count)
        if message_count >= 4:
            update_message = await sync_to_async(Message.objects.filter(room_id=self.room_id).order_by('created_at').first)()
            print(message)
            if message:
                # Update the message object here
                update_message.sender_id = sender_id
                update_message.receiver_id = receiver_id
                update_message.message = message
                update_message.created_at = timezone.now()
                await sync_to_async(update_message.save)()

        else:
            new_message = Message(sender_id=sender_id, receiver_id=receiver_id, message=message,room_id=self.room_id)
            await sync_to_async(new_message.save)()


    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender_id']
        message={"sender_id":sender_id,"message":message}
        
        await self.send(text_data=json.dumps({
            'type':'new_chat',
            'message':message,
        }))


    async def disconnect(self, close_code):
        # Clean up any resources or connections on disconnect
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
