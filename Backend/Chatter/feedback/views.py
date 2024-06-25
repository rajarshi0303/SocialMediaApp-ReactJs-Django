# JWT Authentication
from rest_framework.response import Response
from django.conf import settings
import jwt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

# Serializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

#Models
from sign_up.models import User
from .models import Rating
from post.models import Post
from .models import Feedback
from .models import Like
from .models import Reply
from django.db import IntegrityError
from django.db import transaction
from django.db.models import F
#Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
 
# Create your views here.
@api_view(['POST'])
def add_rating(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            post_id = request.data.get('post_id')
            rating = request.data.get('rating')

            
            # Check for existing rating using a single query
            if not Rating.objects.filter(user_id=user_id, post_id=post_id).exists():
                try:
                    user = get_object_or_404(User.objects.select_related(), id=user_id)
                    post = get_object_or_404(Post.objects.select_related(), id=post_id)

                    with transaction.atomic():
                        new_rating = Rating(
                            username=user.username,
                            profile_image=user.profile_image,
                            rating=rating,
                            post=post,
                            user=user
                        )
                        new_rating.save()

                        star = list(Rating.objects.filter(post_id=post_id).values_list('rating'))

                        # Initialize variables for each star count
                        a = 0  # Number of 1-star ratings
                        b = 0  # Number of 2-star ratings
                        c = 0  # Number of 3-star ratings
                        d = 0  # Number of 4-star ratings
                        e = 0  # Number of 5-star ratings

                        # Iterate over the star_list and assign values to respective variables
                        for count in star:
                            if count[0] == 1:
                                a += 1
                            elif count[0] == 2:
                                b += 1
                            elif count[0] == 3:
                                c += 1
                            elif count[0] == 4:
                                d += 1
                            elif count[0] == 5:
                                e += 1

                        # Calculate the total number of ratings
                        R = a + b + c + d + e

                        # Calculate the average rating if R is not zero
                        AR = (1*a + 2*b + 3*c + 4*d + 5*e) / R if R != 0 else 0
                        # Limit AR to a maximum value of 5
                        AR = min(AR, 5)
                        post.stars=AR
                        post.save()
                        print(AR)


                except IntegrityError:
                    print("Already Rated")


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

@api_view(['GET'])
def view_rating(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            post_id = request.GET.get('post_id')
            print(post_id)
            requests = []
            user_rating = 0
            page_number = request.GET.get('page', 1)
            if Rating.objects.filter(post_id=post_id).exists():
                try:
                    # Query the database once and use values_list() to fetch specific fields
                    objects = Rating.objects.filter(post_id=post_id).order_by('-created_at').values_list('id', 'user_id', 'username', 'profile_image', 'rating')
                    page_size = 3
                    paginator = Paginator(objects, page_size)

                    try:
                        # Retrieve the specified page from the paginator
                        page = paginator.page(page_number)
                    except (PageNotAnInteger, EmptyPage):
                        page = paginator.page(1)
                        
                    for obj in page:
                        requests.append({
                            'id': obj[0],
                            'user_id': obj[1],
                            'username': obj[2],
                            'profile_image': obj[3],
                            'rating': obj[4],
                        })
                    data = {'results': requests}

                    if page.has_next():
                        data['has_next'] = True
                    else:
                        data['has_next'] = False

                    # Fetch the user's rating directly without another database query
                    user_rating = Rating.objects.get(user_id=user_id, post_id=post_id).rating
                    
                except Rating.DoesNotExist:
                    print("Rating object does not exist.")
            else:
                print("Post has no ratings yet")
                return Response(status=400)
            return Response({"list": data, "user": user_rating}, status=200)
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
def add_feedback(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            post_id = request.data.get('post_id')
            feedback = request.data.get('feedback')
            print(post_id, feedback)

            feedback_exists = Feedback.objects.filter(user_id=user_id, post_id=post_id).exists()

            if not feedback_exists:
                user = get_object_or_404(User, id=user_id)
                post = get_object_or_404(Post, id=post_id)
                new_feedback = Feedback(
                    username=user.username,
                    profile_image=user.profile_image,
                    feedback=feedback,
                    post=post,
                    user=user
                )
                with transaction.atomic():
                    new_feedback.save()

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


@api_view(['GET'])
def view_feedback(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            # Token validation successful
            post_id = request.GET.get('post_id')
            print(post_id)
            requests = []
            page_number = request.GET.get('page', 1)
            feedback_queryset = Feedback.objects.filter(post_id=post_id).order_by('-created_at').select_related('user')

            if feedback_queryset.exists():
                page_size = 3
                paginator = Paginator(feedback_queryset, page_size)

                try:
                        # Retrieve the specified page from the paginator
                    page = paginator.page(page_number)
                except (PageNotAnInteger, EmptyPage):
                    page = paginator.page(1)

                for feedback_obj in page:
                    requests.append({
                        'id': feedback_obj.id,
                        'user_id': feedback_obj.user_id,
                        'username': feedback_obj.user.username,
                        'profile_image': feedback_obj.user.profile_image,
                        'feedback': feedback_obj.feedback,
                        'like_count': feedback_obj.like_count,
                        'dislike_count': feedback_obj.dislike_count,
                    })
                data = {'results': requests}
                if page.has_next():
                    data['has_next'] = True
                else:
                    data['has_next'] = False
                    
                    print(requests)
            else:
                print("Post Has No Being Feedback Yet")
                return Response(status=400)
            return Response(data,status=200)
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
def add_like(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            post_id = request.data.get('post_id')
            feedback_id = request.data.get('feedback_id')
            like = request.data.get('like')
            feedback = None  # Define a default value for feedback

            print(post_id, like, feedback)

            if Like.objects.filter(user_id=user_id, feedback_id=feedback_id).exists():
                print("Already Liked")
            else:
                with transaction.atomic():
                    user = get_object_or_404(User, id=user_id)
                    feedback = get_object_or_404(Feedback, id=feedback_id)
                    if like == 'like':
                        Feedback.objects.filter(id=feedback_id).update(like_count=F('like_count') + 1)
                    elif like == 'dislike':
                        Feedback.objects.filter(id=feedback_id).update(dislike_count=F('dislike_count') + 1)

                    obj = Like(user=user, feedback=feedback)
                    obj.save()

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



@api_view(['POST'])
def add_reply(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            feedback_id = request.data.get('feedback_id')
            reply = request.data.get('reply')
            print(feedback_id, reply)
            reply_exists = Reply.objects.filter(user_id=user_id, feedback_id=feedback_id).exists()

            if not reply_exists:
                user = get_object_or_404(User, id=user_id)
                feedback = get_object_or_404(Feedback, id=feedback_id)
                new_reply = Reply(
                    username=user.username,
                    profile_image=user.profile_image,
                    reply=reply,
                    feedback=feedback,
                    user=user
                )
                with transaction.atomic():
                    new_reply.save()
            else:
                return Response(status=400)
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
    


@api_view(['GET'])
def view_reply(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            # Token validation successful
            feedback_id = request.GET.get('feedback_id')
            print(feedback_id)
            requests = []
            page_number = request.GET.get('page', 1)
            reply_queryset = Reply.objects.filter(feedback_id=feedback_id).order_by('-created_at').select_related('user')

            if reply_queryset.exists():
                page_size = 3
                paginator = Paginator(reply_queryset, page_size)

                try:
                        # Retrieve the specified page from the paginator
                    page = paginator.page(page_number)
                except (PageNotAnInteger, EmptyPage):
                    page = paginator.page(1)

                for reply in page:
                    requests.append({
                        'id': reply.id,
                        'user_id': reply.user_id,
                        'username': reply.user.username,
                        'profile_image': reply.user.profile_image,
                        'reply': reply.reply,
                    })
                data = {'results': requests}
                if page.has_next():
                    data['has_next'] = True
                else:
                    data['has_next'] = False
                    
            else:
                print("Post Has No Being Feedback Yet")
                return Response(status=400)
            return Response(data,status=200)
        
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