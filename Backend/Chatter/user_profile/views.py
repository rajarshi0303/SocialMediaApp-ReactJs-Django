from django.shortcuts import get_object_or_404

# RestFramework modules
from rest_framework.decorators import api_view
from rest_framework.response import Response

# JWT Authentication
from rest_framework.response import Response
from django.conf import settings
import jwt

# Models
from sign_up.models import User
from django.db import transaction
from django.contrib.auth.hashers import check_password, make_password

@api_view(['GET'])
def user_info(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            user = User.objects.filter(id=user_id).values('username','profile_image', 'bio','follower_count','following_count','post_count','link')[0]            
            return Response(user)
    
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
def logout(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            # Token validation successful
            response = Response()
            response.delete_cookie('token')
            return response
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
def edit_user_info(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            with transaction.atomic():
                User.objects.filter(id=user_id).update(
                    profile_image=request.data.get('profile_image'),
                    bio=request.data.get('bio'),
                    link=request.data.get('link')
                )
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
def edit_username(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            new_username = request.data.get('username')

            # Fetch the user object with related fields in a single query
            user = User.objects.select_related().get(id=user_id)

            if user.username != new_username:
                if User.objects.filter(username=new_username).exists():
                    # Username already exists in the database
                    return Response(status=402)

                # Update the username in memory
                user.username = new_username

                # Prepare a list of user objects to update
                users_to_update = [user]

                # Bulk update the usernames in the database
                User.objects.bulk_update(users_to_update, ['username'])

                # Username successfully changed, you can return a success response if needed
                return Response(status=200)
            else:
                return Response(status=402)

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
def change_password(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            user = get_object_or_404(User.objects.only('id'), id=user_id)  # Optimize select_related() with only('id')

            old_password = request.data.get('oldpassword')

            # Check if the password entered by the user is valid or not
            if check_password(old_password, user.password):
                new_password = request.data.get('newpassword')
                user.password = make_password(new_password)  # Hash the new password
                User.objects.bulk_update([user], fields=['password'])
                # Password successfully changed, you can return a success response if needed
                return Response(status=200)
            else:
                # Password is not valid, return an error response
                return Response(status=400)
            
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
def change_email(request):
    token = request.COOKIES.get('token')
    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            new_email = request.data.get('email')

            # Fetch the user object with related fields in a single query
            user = User.objects.select_related().get(id=user_id)

            if user.email != new_email:
                if User.objects.filter(email=new_email).exists():
                    # Email already exists in the database
                    return Response(status=402)

                # Update the email in memory
                user.email = new_email

                # Prepare a list of user objects to update
                users_to_update = [user]

                # Bulk update the emails in the database
                User.objects.bulk_update(users_to_update, ['email'])

                # Email successfully changed, you can return a success response if needed
                return Response(status=200)
            else:
                return Response(status=402)
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
