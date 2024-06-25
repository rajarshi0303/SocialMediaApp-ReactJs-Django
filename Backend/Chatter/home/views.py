
# JWT Authentication
from rest_framework.response import Response
from django.conf import settings
import jwt

# Serializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# models
from post.models import Post ,Hashtag
from search.models import Followers

#Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.




@api_view(['GET'])
def home_posts(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            following_ids = Followers.objects.filter(user_id=user_id).values_list('friend_id', flat=True)
            following_posts = Post.objects.filter(user_id__in=following_ids,privacy="public").order_by('-post_datetime').values(
            'id', 'username', 'profile_image', 'description', 'hashtag', 'text', 'image', 'video', 'audio', 'privacy',
            'link', 'stars', 'user_id'
            )

            follower_ids = Followers.objects.filter(friend_id=user_id).values_list('user_id', flat=True)
            follower_posts = Post.objects.filter(user_id__in=follower_ids).order_by('-post_datetime').values(
            'id', 'username', 'profile_image', 'description', 'hashtag', 'text', 'image', 'video', 'audio', 'privacy',
            'link', 'stars', 'user_id'
            )


            hashtags = Hashtag.objects.filter(user_id=user_id).values_list('hashtag', flat=True)
            hashtag_posts = Post.objects.filter(hashtag__in=hashtags,privacy="public").order_by('-post_datetime').values(
            'id', 'username', 'profile_image', 'description', 'hashtag', 'text', 'image', 'video', 'audio', 'privacy',
            'link', 'stars', 'user_id'
            )

            combined_posts = following_posts | hashtag_posts | follower_posts
            
            # Create a paginator with a desired page size
            page_size = 4
            paginator = Paginator(combined_posts, page_size)
            
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
                        'user_id': post['user_id'],
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

            return Response(data,status=200)
    
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
def new_explore_posts(request):
    # No Token validation Required
    explore_posts = Post.objects.filter(privacy="public").order_by('-post_datetime').values(
            'id', 'username', 'profile_image', 'description', 'hashtag', 'text', 'image', 'video', 'audio', 'privacy',
            'link', 'stars', 'user_id'
            )
            
    # Create a paginator with a desired page size
    page_size = 4
    paginator = Paginator(explore_posts, page_size)
            
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
                        'user_id': post['user_id'],
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

    return Response(data,status=200)


@api_view(['GET'])
def top_explore_posts(request):
    # Token validation successful
    explore_posts = Post.objects.filter(privacy="public").order_by('-stars').values(
            'id', 'username', 'profile_image', 'description', 'hashtag', 'text', 'image', 'video', 'audio', 'privacy',
            'link', 'stars', 'user_id'
            )
            
    # Create a paginator with a desired page size
    page_size = 4
    paginator = Paginator(explore_posts, page_size)
            
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
                        'user_id': post['user_id'],
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

    return Response(data,status=200)



@api_view(['GET'])
def video_explore_posts(request):
    # Token validation successful
    explore_posts = Post.objects.filter(privacy="public").exclude(video='').order_by('-post_datetime').values(
    'id', 'username', 'profile_image', 'description', 'hashtag', 'video',
    'link', 'stars', 'user_id'
    )

    print(explore_posts)  
    # Create a paginator with a desired page size
    page_size = 4
    paginator = Paginator(explore_posts, page_size)
            
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

        if post['video']:
            content = post['video']

        if content:
                    requests.append({
                        'id': post['id'],
                        'username': post['username'],
                        'user_id': post['user_id'],
                        'profile_image': post['profile_image'],
                        'description': post['description'],
                        'hashtag': post['hashtag'],
                        'link': post['link'],
                        'rating': post['stars'],
                        'content': content,
                        'content_type': "video",
                    })

    data = {'results': requests}

    if page.has_next():
        data['has_next'] = True
    else:
        data['has_next'] = False

    return Response(data,status=200)

@api_view(['GET'])
def image_explore_posts(request):
    # Token validation successful
    explore_posts = Post.objects.filter(privacy="public").exclude(image='').order_by('-post_datetime').values(
    'id', 'username', 'profile_image', 'description', 'hashtag', 'image',
    'link', 'stars', 'user_id'
    )

    print(explore_posts)  
    # Create a paginator with a desired page size
    page_size = 4
    paginator = Paginator(explore_posts, page_size)
            
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

        if post['image']:
            content = post['image']

        if content:
                    requests.append({
                        'id': post['id'],
                        'username': post['username'],
                        'user_id': post['user_id'],
                        'profile_image': post['profile_image'],
                        'description': post['description'],
                        'hashtag': post['hashtag'],
                        'link': post['link'],
                        'rating': post['stars'],
                        'content': content,
                        'content_type': "image",
                    })

    data = {'results': requests}

    if page.has_next():
        data['has_next'] = True
    else:
        data['has_next'] = False

    return Response(data,status=200)


@api_view(['GET'])
def text_explore_posts(request):
    # Token validation successful
    explore_posts = Post.objects.filter(privacy="public").exclude(text__isnull=True).order_by('-post_datetime').values(
    'id', 'username', 'profile_image', 'description', 'hashtag', 'text',
    'link', 'stars', 'user_id'
    )

    print(explore_posts)  
    # Create a paginator with a desired page size
    page_size = 4
    paginator = Paginator(explore_posts, page_size)
            
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

        if post['text']:
            content = post['text']

        if content:
                    requests.append({
                        'id': post['id'],
                        'username': post['username'],
                        'user_id': post['user_id'],
                        'profile_image': post['profile_image'],
                        'description': post['description'],
                        'hashtag': post['hashtag'],
                        'link': post['link'],
                        'rating': post['stars'],
                        'content': content,
                        'content_type': "text",
                    })

    data = {'results': requests}

    if page.has_next():
        data['has_next'] = True
    else:
        data['has_next'] = False

    return Response(data,status=200)



@api_view(['GET'])
def audio_explore_posts(request):
    # Token validation successful
    explore_posts = Post.objects.filter(privacy="public").exclude(audio='').order_by('-post_datetime').values(
    'id', 'username', 'profile_image', 'description', 'hashtag', 'audio',
    'link', 'stars', 'user_id'
    )

    print(explore_posts)  
    # Create a paginator with a desired page size
    page_size = 4
    paginator = Paginator(explore_posts, page_size)
            
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

        if post['audio']:
            content = post['audio']

        if content:
                    requests.append({
                        'id': post['id'],
                        'username': post['username'],
                        'user_id': post['user_id'],
                        'profile_image': post['profile_image'],
                        'description': post['description'],
                        'hashtag': post['hashtag'],
                        'link': post['link'],
                        'rating': post['stars'],
                        'content': content,
                        'content_type': "audio",
                    })

    data = {'results': requests}

    if page.has_next():
        data['has_next'] = True
    else:
        data['has_next'] = False

    return Response(data,status=200)