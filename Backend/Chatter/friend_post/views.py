# JWT Authentication
from rest_framework.response import Response
from django.conf import settings
import jwt

# RestFramework
from rest_framework.decorators import api_view
from rest_framework.response import Response

# models
from post.models import Post
from search.models import Followers
#Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def friend_posts(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            friend_id = request.GET.get('friend_id')
            print(friend_id)
            # Getting the followings of user
            following_ids = list(Followers.objects.filter(user_id=friend_id).values_list('friend_id', flat=True))
            print(following_ids)
            # Getting Users Post
            user_posts = Post.objects.filter(user_id=friend_id).order_by('-post_datetime').values()
            
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
                if post['privacy'] == 'following' and user_id not in following_ids:
                    continue
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


    
@api_view(['GET'])
def shared_post_view(request,post_id):
    
    # Your logic to fetch and return the data
    # ...
    # Getting Users Post
    post = Post.objects.filter(id=post_id).values().first()
    response_data = {}

    if post:
        if post['privacy'] == 'following':
            response_data = {
                'username': post['username'],
                'status': "private",
            }
        else:
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
                response_data = {
                    'id': post['id'],
                    'username': post['username'],
                    'profile_image': post['profile_image'],
                    'description': post['description'],
                    'hashtag': post['hashtag'],
                    'link': post['link'],
                    'rating': post['stars'],
                    'content': content,
                    'content_type': content_type,
                    'status': "public",
                }
        print(response_data)
        return Response(response_data)
    else:
        return Response(status=401)
 
