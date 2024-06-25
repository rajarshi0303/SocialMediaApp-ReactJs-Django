# JWT Authentication
from rest_framework.response import Response
from django.conf import settings
import jwt
from django.http import JsonResponse

# Serializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PostTextSerializer, PostImageSerializer, PostVideoSerializer, PostAudioSerializer

# models
from sign_up.models import User
from .models import Post ,HashtagList
from django.db import transaction
from django.db.models import F
from django.shortcuts import get_object_or_404

#Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['POST'])
def add_post(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            print(request.data)
            print(request.data.get('content_type'))

            user = User.objects.filter(id=user_id).values('id', 'username', 'profile_image', 'post_count').first()

            if not user:
                return Response({'error': 'User not found'}, status=404)

            content_type = request.data.get('content_type')

            mydata = {
                'user': user['id'],
                'username': user['username'],
                'profile_image': user['profile_image'],
                'description': request.data['description'],
                'hashtag': request.data['hashtag'],
                'privacy': request.data['privacy'],
                'link': request.data['link']
            }

            serializer_class = None

            if content_type == 'text':
                mydata['text'] = request.data.get('content')
                serializer_class = PostTextSerializer
            elif content_type == 'image':
                mydata['image'] = request.data.get('content')
                serializer_class = PostImageSerializer
            elif content_type == 'video':
                mydata['video'] = request.data.get('content')
                serializer_class = PostVideoSerializer
            elif content_type == 'audio':
                mydata['audio'] = request.data.get('content')
                serializer_class = PostAudioSerializer
            else:
                return Response({'error': 'Invalid content_type'}, status=400)

            serializer = serializer_class(data=mydata)

            if serializer.is_valid():
                with transaction.atomic():
                    serializer.save()
                    User.objects.filter(id=user_id).update(post_count=F('post_count') + 1)
                    hashtag = request.data.get('hashtag')
                    if hashtag:
                        with transaction.atomic():
                            hashtag_obj, created = HashtagList.objects.get_or_create(hashtag=hashtag)
                return Response(serializer.data, status=201)
            else:
                return Response(status=400)

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
def user_posts(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful

            user_posts = Post.objects.filter(user_id=user_id).order_by('-post_datetime').values()
    
            # Create a paginator with a desired page size
            page_size = 4
            paginator = Paginator(user_posts, page_size)
            
            # Get the requested page number (e.g., from the request query parameters)
            page_number = request.GET.get('page', 1)
            
            try:
                # Retrieve the specified page from the paginator
                page = paginator.page(page_number)
            except (PageNotAnInteger, EmptyPage):
                page = paginator.page(1)

            requests = []
            for post in page:
                content_type = None
                content = None

                if post['text']:  # Check if the text field is not empty
                    content_type = 'text'
                    content = post['text']
                elif post['image']:  # Check if the image field is not empty
                    content_type = 'image'
                    content = post['image']
                elif post['video']:  # Check if the video field is not empty
                    content_type = 'video'
                    content = post['video']
                elif post['audio']:  # Check if the audio field is not empty
                    content_type = 'audio'
                    content = post['audio']

                if content_type:
                    requests.append({
                        'id': post['id'],
                        'username': post['username'],
                        'profile_image': post['profile_image'],
                        'description': post['description'],
                        'hashtag': post['hashtag'],
                        'link': post['link'],
                        'rating': post['stars'],
                        'content': content,
                        'content_type': content_type,
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
            return Response({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            # Invalid token
            print('Invalid token')
            return Response({'error': 'Invalid token'}, status=401)
    else:
        # Token not provided
        print('Token not provided')
        return Response({'error': 'Token not provided'}, status=401)


@api_view(['POST'])
def delete_post(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            post_id=request.data.get('post_id')
            print(post_id)
            try:
                with transaction.atomic():
                    obj = get_object_or_404(Post.objects.only('id'), id=post_id)
                    user_id = obj.user_id  # Assuming `user_id` is obtained from the `Post` object
                    obj.delete()
                    User.objects.filter(id=user_id).update(post_count=F('post_count') - 1)
                return Response(200)
            except Exception:
                return Response(400)
                # Handle exceptions or error conditions
        
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
def post_data(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            post_id = request.GET.get('post_id')
            print(post_id)

            try:
                obj = Post.objects.filter(id=post_id).values(
                    'description',
                    'hashtag',
                    'privacy',
                    'id',
                    'user_id'
                ).first()

                if obj['user_id'] == user_id:
                    response_data = {
                        'description': obj['description'],
                        'hashtag': obj['hashtag'],
                        'privacy': obj['privacy'],
                        'post_id': obj['id']
                    }
                    return Response(response_data, status=200)
                else:
                    return Response(status=400)
            except Post.DoesNotExist:
                return Response(status=400)
        
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
    

@api_view(['POST'])
def edit_post(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            
        
            post_id = request.data.get('post_id')
            description = request.data.get('description')
            hashtag = request.data.get('hashtag')
            privacy = request.data.get('privacy')
            print(post_id, description, hashtag, privacy)

            # Fetch the specific post with the given post_id
            post = Post.objects.get(id=post_id)

            with transaction.atomic():
                post.description = description
                post.hashtag = hashtag
                post.privacy = privacy

                Post.objects.bulk_update([post], fields=['description', 'hashtag', 'privacy'])
                hashtag = request.data.get('hashtag')
                if hashtag:
                    hashtag_obj, created = HashtagList.objects.get_or_create(hashtag=hashtag)

            return Response(status=200)

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
    