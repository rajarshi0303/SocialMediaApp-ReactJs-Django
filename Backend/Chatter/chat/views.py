# JWT Authentication
from django.conf import settings
import jwt
from django.http import JsonResponse

# Serializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

#Model
from .models import ChatRoom
from django.db.models import Q
from django.utils import timezone
from django.db import transaction
#Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


# Create your views here.
@api_view(['POST'])
def create_room(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            receiver_id = request.data.get('receiver_id')

            chatroom1 = ChatRoom.objects.select_related('receiver', 'sender').filter(receiver_id=receiver_id, sender_id=user_id).first()
            chatroom2 = ChatRoom.objects.select_related('receiver', 'sender').filter(receiver_id=user_id, sender_id=receiver_id).first()

            with transaction.atomic():
                room_id = None  # Initialize room_id

                if chatroom1:
                    room_id = chatroom1.id
                    chatroom1.created_at = timezone.now()
                    chatroom1.save()

                elif chatroom2:
                    room_id = chatroom2.id
                    chatroom2.created_at = timezone.now()
                    chatroom2.save()

                else:
                    new_chat = ChatRoom(sender_id=user_id, receiver_id=receiver_id)
                    new_chat.save()
                    room_id = new_chat.id

            return JsonResponse({'room_id': room_id, 'user_id': user_id}, status=200)

        except jwt.ExpiredSignatureError:
            # Token has expired
            print('Token has expired')
            return JsonResponse({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            # Invalid token
            print('Invalid token')
            return JsonResponse({'error': 'Invalid token'}, status=401)
    else:
        # Token not provided
        print('Token not provided')
        return JsonResponse({'error': 'Token not provided'}, status=401)
    
@api_view(['GET'])
def chat_room(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            
            requests = []

            chats = (
                ChatRoom.objects
                .select_related('sender', 'receiver')
                .filter(Q(receiver_id=user_id) | Q(sender_id=user_id))
                .order_by('-created_at')
                .values('id',
                    'sender__id', 'receiver__id',
                    'sender__username', 'receiver__username',
                    'sender__profile_image', 'receiver__profile_image'
                )
            )
            
            # Create a paginator with a desired page size
            page_size = 4
            paginator = Paginator(chats, page_size)
            
            # Get the requested page number (e.g., from the request query parameters)
            page_number = request.GET.get('page', 1)
            
            try:
                # Retrieve the specified page from the paginator
                page = paginator.page(page_number)
            except (PageNotAnInteger, EmptyPage):
                page = paginator.page(1)

            for chat in page:
                sender_id = chat['sender__id']
                receiver_id = chat['receiver__id']

                if sender_id == user_id:
                    requests.append({
                        'room_id':chat['id'],
                        'sender_id': receiver_id,
                        'receiver_id':sender_id,
                        'username': chat['receiver__username'],
                        'profile_image': chat['receiver__profile_image'],
                    })
                elif receiver_id == user_id:
                    requests.append({
                        'room_id':chat['id'],
                        'sender_id': sender_id,
                        'receiver_id':receiver_id,
                        'username': chat['sender__username'],
                        'profile_image': chat['sender__profile_image'],
                    })
            
            data = {'results': requests}

            if page.has_next():
                data['has_next'] = True
            else:
                data['has_next'] = False

            return Response(data, status=200)


        except jwt.ExpiredSignatureError:
            # Token has expired
            print('Token has expired')
            return JsonResponse({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            # Invalid token
            print('Invalid token')
            return JsonResponse({'error': 'Invalid token'}, status=401)
    else:
        # Token not provided
        print('Token not provided')
        return JsonResponse({'error': 'Token not provided'}, status=401)
