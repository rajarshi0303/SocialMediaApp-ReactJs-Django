from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Model
from sign_up.models import User
from .models import Followers
from django.db.models import F
from django.db import transaction
# JWT Authentication
from rest_framework.response import Response
from django.conf import settings
import jwt

#Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['GET'])
def user_search_view(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            # Token validation successful
            search_query = request.query_params.get('search')
            users = User.objects.filter(username__icontains=search_query).values('id', 'username', 'profile_image')[:10]
            return Response(users)

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
def friend(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            follower_id = request.GET.get('follower_id')

            # Fetch Count object with related User object using select_related()
            try:
                user = User.objects.values('username', 'profile_image', 'bio', 'follower_count', 'following_count', 'post_count','link').get(id=follower_id)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=404)
 
            follower = Followers.objects.filter(user_id=user_id, friend_id=follower_id).first()
            status = follower.status if follower is not None else "follow"

            friend = {
                'username': user['username'],
                'image': user['profile_image'],
                'bio': user['bio'],
                'status': status,
                'followings_count': user['following_count'],
                'followers_count': user['follower_count'],
                'post_count': user['post_count'],
                'link': user['link'],
            }

            return Response(friend)


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
def follow(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            follower_id = request.data.get('follower_id')

            try:
                with transaction.atomic():
                    # Check if the user has already made a follower request for the same user
                    follower_exists = Followers.objects.filter(user_id=user_id, friend_id=follower_id).exists()
                    if follower_exists:
                        return Response({'error': 'Already Requested'}, status=400)

                    user = get_object_or_404(User, id=user_id)

                    # Create or update the Follower object in a single query
                    follower, _ = Followers.objects.update_or_create(user=user, friend_id=follower_id, defaults={'status': 'following'})

                    # Update follower_count and following_count using F() expressions
                    User.objects.filter(id=follower_id).update(follower_count=F('follower_count') + 1)
                    User.objects.filter(id=user_id).update(following_count=F('following_count') + 1)

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


@api_view(['GET'])
def follower(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            # Retrieve follower IDs and their statuses using a single query
            follower_info = Followers.objects.filter(friend_id=user_id).select_related('user').values('user_id', 'user__profile_image', 'user__username', 'status').order_by('user_id')
            following_ids = Followers.objects.filter(user_id=user_id).values_list('friend_id', flat=True)
            # Create a paginator with a desired page size
            page_size = 3
            paginator = Paginator(follower_info, page_size)

            # Get the requested page number (e.g., from the request query parameters)
            page_number = request.GET.get('page', 1)

            try:
                # Retrieve the specified page from the paginator
                page = paginator.page(page_number)
            except (PageNotAnInteger, EmptyPage):
                print("Page Not Found")

            requests = []
            for info in page:

                requests.append({
                    'follower_id': info['user_id'],
                    'username': info['user__username'],
                    'image': info['user__profile_image'],
                    'status': "following" if info['user_id'] in following_ids else "followback"
                })

            # Create the response containing the paginated requests
            response_data = {
                'results': requests
            }

            # Add the 'has_next' flag based on the existence of next page
            if page.has_next():
                response_data['has_next'] = True
            else:
                response_data['has_next'] = False

            return Response(response_data)


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
def followings(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            page = request.GET.get('page', 1)
            # Retrieve user_ids of followers
            following_ids = Followers.objects.filter(user_id=user_id).values_list('friend_id', flat=True)

            # Retrieve user_info using a single query with JOIN and only select necessary fields
            user_info = User.objects.filter(id__in=following_ids).values('id', 'profile_image', 'username').order_by('id')
            
            paginator = Paginator(user_info, 10)

            try:
                users = paginator.page(page)
            except (PageNotAnInteger, EmptyPage):
                users = paginator.page(1)

            requests = []
            for info in users:
                requests.append({
                    'following_id': info['id'],
                    'username': info['username'],
                    'image': info['profile_image'],
                })

            data = {'results': requests}

            if users.has_next():
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


@api_view(['POST'])
def un_follow(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            follower_id = request.data.get('follower_id')

            # Check if the user is following
            existing_follower = Followers.objects.filter(user_id=user_id, friend_id=follower_id).first()

            if existing_follower:
                with transaction.atomic():
                    existing_follower.delete()
                    User.objects.filter(id=follower_id).update(follower_count=F('follower_count') - 1)
                    User.objects.filter(id=user_id).update(following_count=F('following_count') - 1)

                return Response(status=200)
            else:
                return Response({'error': 'Follower not found'}, status=404)

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
def user_suggestion(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            users = User.objects.order_by('-follower_count').values('id', 'username', 'profile_image')
            following_ids = Followers.objects.filter(user_id=user_id).values_list('friend_id', flat=True)
            # Create a paginator with a desired page size
            page_size = 4
            paginator = Paginator(users, page_size)

            # Get the requested page number (e.g., from the request query parameters)
            page_number = request.GET.get('page', 1)

            try:
                # Retrieve the specified page from the paginator
                page = paginator.page(page_number)
            except (PageNotAnInteger, EmptyPage):
                page = paginator.page(1)

            requests = []
            for user in page:
                requests.append({
                    'user_id': user['id'],
                    'username': user['username'],
                    'image': user['profile_image'],
                    'status': "following" if user['id'] in following_ids else "follow"
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