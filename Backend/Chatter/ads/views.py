# Create your views here.

# JWT Authentication
from rest_framework.response import Response
from django.conf import settings
import jwt
from django.http import JsonResponse

# Serializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AdsPostTextSerializer,AdsPostImageSerializer,AdsPostVideoSerializer,AdsPostAudioSerializer


# models
from .models import AdsPost
from django.db import transaction
from django.db.models import F

#Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
 
@api_view(['POST'])
def post_ads(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful

            content_type = request.data.get('content_type')
            mydata = {
                'user': user_id,
                'brandname': request.data['brandname'],
                'description': request.data['description'],
                'hashtag': request.data['hashtag'],
                'link': request.data['link'],
                'status':"inactive",
            }

            serializer_class = None

            if content_type == 'text':
                mydata['text'] = request.data.get('content')
                serializer_class = AdsPostTextSerializer
            elif content_type == 'image':
                mydata['image'] = request.data.get('content')
                serializer_class = AdsPostImageSerializer
            elif content_type == 'video':
                mydata['video'] = request.data.get('content')
                serializer_class = AdsPostVideoSerializer
            elif content_type == 'audio':
                mydata['audio'] = request.data.get('content')
                serializer_class = AdsPostAudioSerializer
            else:
                return Response({'error': 'Invalid content_type'}, status=400)

            serializer = serializer_class(data=mydata)

            if serializer.is_valid():
                with transaction.atomic():
                    serializer.save()
                return Response({'id': serializer.instance.id}, status=201)
            else:
                print(serializer.errors)
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
def ads(request):
    # No Token validation Required
    post_ad={}
    # Get the current ads_count value from the session or set it to 0 if not present
    ads_count = request.session.get('ads_count', 0)

    if ads_count < 20:
        # Query AdsPost objects with status "active" and views less than 10
        ads_lt_10 = AdsPost.objects.filter(status="active", views__lt=30).order_by('views').values(
        'id', 'brandname', 'description', 'link', 'text', 'image', 'video', 'audio').first()

        if ads_lt_10:
            ads = ads_lt_10
        else:
            # If there are no AdsPost objects with views less than 10, execute the query for views greater than 25
            ads_gt_10 = AdsPost.objects.filter(status="active", views__gte=30).order_by('views').values(
            'id', 'brandname', 'description', 'link', 'text', 'image', 'video', 'audio').first()
            ads = ads_gt_10

        # Increment the ads_count variable
        ads_count += 1
    else:
        # Query AdsPost objects with status "active" and views greater than 10
        ads = AdsPost.objects.filter(status="active", views__gte=30).order_by('views').values(
        'id', 'brandname', 'description', 'link', 'text', 'image', 'video', 'audio').first()
        # Reset ads_count to 0
        ads_count = 0

    # Save the updated ads_count value back to the session
    request.session['ads_count'] = ads_count


    if ads:
        # Retrieve the AdsPost instance with the given id and update the 'views' field
        AdsPost.objects.filter(id=ads['id']).update(views=F('views') + 1)

        if ads['text']:
            ad_content = ads['text']
            ad_content_type = 'text'
        elif ads['image']:
            ad_content = ads['image']
            ad_content_type = 'image'
        elif ads['video']:
            ad_content = ads['video']
            ad_content_type = 'video'
        elif ads['audio']:
            ad_content = ads['audio']
            ad_content_type = 'audio'

        if ad_content:
            post_ad={
                'id': ads['id'],
                'brandname': ads['brandname'],
                'description': ads['description'],
                'link': ads['link'],
                'content': ad_content,
                'content_type': ad_content_type,
            }

    return Response(post_ad,status=200)

 
@api_view(['POST'])
def ads_click(request):
    ads_id = request.data.get('ads_id')
    print(ads_id)
    if ads_id:
        with transaction.atomic():   
            AdsPost.objects.filter(id=ads_id).update(clicks=F('clicks') + 1)                 

    return Response(status=200)

@api_view(['GET'])
def my_ads(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            ads = AdsPost.objects.filter(user_id=user_id).order_by('-post_datetime').values('id', 'views', 'clicks', 'plan', 'status', 'post_datetime','text', 'image', 'video', 'audio')

            # Create a paginator with a desired page size
            page_size = 4
            paginator = Paginator(ads, page_size)

            # Get the requested page number (e.g., from the request query parameters)
            page_number = request.GET.get('page', 1)

            try:
                # Retrieve the specified page from the paginator
                page = paginator.page(page_number)
            except (PageNotAnInteger, EmptyPage):
                page = paginator.page(1)

            # Create a list to hold the paginated data
            results = []

            # Iterate over the paginated data and build the result list
            for ad in page:
                if ad['text']:
                    ad_content = ad['text']
                    ad_content_type = 'text'
                elif ad['image']:
                    ad_content = ad['image']
                    ad_content_type = 'image'
                elif ad['video']:
                    ad_content = ad['video']
                    ad_content_type = 'video'
                elif ad['audio']:
                    ad_content = ad['audio']
                    ad_content_type = 'audio'
        
                results.append({
                    'id': ad['id'],
                    'views': ad['views'],
                    'clicks': ad['clicks'],
                    'plan': ad['plan'],
                    'status': ad['status'],
                    'post_datetime': ad['post_datetime'],
                    'content': ad_content,
                    'content_type':ad_content_type
                })

            data = {'results': results}

            # Check if there is a next page
            data['has_next'] = page.has_next()

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
def ads_data(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            ads_id = request.GET.get('ads_id')
            print(ads_id)
            obj = AdsPost.objects.filter(id=ads_id).values(
                'description',
                'hashtag',
                'id',
            ).first()
            
            return Response(obj,status=200)
            
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
def edit_ads(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            
        
            ads_id = request.data.get('ads_id')
            description = request.data.get('description')
            hashtag = request.data.get('hashtag')
            print(ads_id, description, hashtag)
            if ads_id:
                # Fetch the specific post with the given post_id
                ads = AdsPost.objects.get(id=ads_id)

                with transaction.atomic():
                    ads.description = description
                    ads.hashtag = hashtag

                    AdsPost.objects.bulk_update([ads], fields=['description', 'hashtag'])

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
def delete_ads(request):
    token = request.COOKIES.get('token')

    if token:
        try:
            decoded_token = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['user_id']
            # Token validation successful
            ads_id=request.data.get('ads_id')
            print(ads_id)
            try:
                with transaction.atomic():
                    obj = AdsPost.objects.get(id=ads_id)
                    obj.delete()
                    
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