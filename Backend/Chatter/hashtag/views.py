# JWT Authentication
from rest_framework.response import Response
from django.conf import settings
import jwt

# RestFramework
from rest_framework.decorators import api_view
from rest_framework.response import Response

# models
from post.models import Post ,HashtagList
from post.models import Hashtag
from sign_up.models import User
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.db.models import F
#Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def hashtag_search(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            # Token validation successful
            search_query = request.query_params.get('hashtag')
            hashtags = HashtagList.objects.filter(hashtag__icontains=search_query).values('hashtag')[:10]
            return Response(hashtags)

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
    
@api_view(['GET'])
def hashtag(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            hashtag = request.GET.get('hashtag')
            print(hashtag)

            if hashtag is None:
                return Response(status=400)


            filtered_posts = Post.objects.filter(hashtag__iexact=hashtag,privacy="public").order_by('-post_datetime').values(
    'id', 'username', 'profile_image', 'description', 'hashtag', 'text', 'image', 'video', 'audio', 'privacy',
    'link','stars','post_datetime', 'user_id'
            )
            # Create a paginator with a desired page size
            page_size = 4
            paginator = Paginator(filtered_posts, page_size)
            
            # Get the requested page number (e.g., from the request query parameters)
            page_number = request.GET.get('page', 1)
            
            try:
                # Retrieve the specified page from the paginator
                page = paginator.page(page_number)
            except (PageNotAnInteger, EmptyPage):
                page = paginator.page(1)
            requests = []
            for post in page:

                content = None
                content_type = None

                if post['text']:
                    content = post['text']
                    content_type = 'text'
                elif post['image']:
                    content = post['image']
                    content_type = 'image'
                elif post['video']:
                    content = post['video']
                    content_type = 'video'
                elif post['audio']:
                    content = post['audio']
                    content_type = 'audio'

                if content:
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

            if Hashtag.objects.filter(user_id=user_id,hashtag=hashtag).exists():
                data['status'] = "unfollow"
            else:
                data['status'] = "follow"

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
def follow_hashtag(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            hashtag = request.data.get('hashtag')

            try:
                with transaction.atomic():
                    # Check if the user has already follow the same hashtag or not
                    if not Hashtag.objects.filter(user_id=user_id,hashtag=hashtag).exists():
                        user = get_object_or_404(User, id=user_id)
                        # Create or update the Follower object in a single query
                        new_hash = Hashtag(user=user, hashtag=hashtag)
                        new_hash.save()
                        HashtagList.objects.filter(hashtag=hashtag).update(count=F('count') + 1)
                        
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=404)
            
            return Response(status=200)

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
def un_follow_hashtag(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            hashtag = request.data.get('hashtag')

            # Check if the user is following
            existing_hashtag = Hashtag.objects.filter(user_id=user_id, hashtag=hashtag).first()

            if existing_hashtag:
                with transaction.atomic():
                    existing_hashtag.delete()   
                    HashtagList.objects.filter(hashtag=hashtag).update(count=F('count') - 1)                 
                return Response(status=200)
            else:
                return Response({'error': 'hashtag not found'}, status=404)

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


@api_view(['GET'])
def hashtag_suggestion(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            hashtags = HashtagList.objects.values('hashtag').order_by('-count')

            # Create a paginator with a desired page size
            page_size = 4
            paginator = Paginator(hashtags, page_size)

            # Get the requested page number (e.g., from the request query parameters)
            page_number = request.GET.get('page', 1)

            try:
                # Retrieve the specified page from the paginator
                page = paginator.page(page_number)
            except (PageNotAnInteger, EmptyPage):
                page = paginator.page(1)

            requests = []
            for hashtag in page:
                requests.append({
                    'hashtag': hashtag['hashtag'],
                })

            data = {'results': requests}

            if page.has_next():
                data['has_next'] = True
            else:
                data['has_next'] = False

            return Response(data)

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