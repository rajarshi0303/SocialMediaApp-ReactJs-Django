# RestFramework modules
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Models module
from .models import OTPVerification,User
from django.db import transaction
from .models import ContactUs

# JWT Authentication module
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
import jwt
from django.conf import settings
from rest_framework.response import Response

# Mail module
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
def register(request):
    # Retrieve the email and username from the request data
    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')
    if not (username and password and email):
        # if username or password or email is empty
        return Response(status=403)
    if User.objects.filter(email=email).exists():
        # Email already exists in the database
        return Response(status=401)
    elif User.objects.filter(username=username).exists():
        # username already exists in the database
        return Response(status=402)
    else:
        print("Create Account")
        # Create a new user
        hashed_password = make_password(password)
        profile_image_path = "/public/images/ProfilePicture/default.png"

        user = User(username=username, password=hashed_password, email=email, profile_image=profile_image_path)
        # Create a list of User objects
        user_list = [user]
        # Use bulk_create() to insert the user objects in a single query
        User.objects.bulk_create(user_list)
        return Response(status=200)


@api_view(['POST'])
def login(request):
   # Get username and password from request data
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate the user
    user = authenticate(username=username, password=password)
    # If authentication is successful, generate new access token and return it in response
    if user:
        payload = {'user_id': user.id}
        token = jwt.encode(
            payload, settings.SECRET_KEY, algorithm='HS256')

        response = Response('Cookie set successfully')
        response.set_cookie('token', token, httponly=True)
        return response

    # If authentication fails, return error response
    else:
        return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['POST'])
def forgerpassword(request):
    email = request.data.get('email')

    if not email:
        return Response({'error': 'Email is required.'}, status=400)
    else:
        otp_code = get_random_string(length=6, allowed_chars='0123456789')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(status=400)

        otp_verification, created = OTPVerification.objects.update_or_create(
            user=user,
            defaults={'otp_code': otp_code}
        )

        if not created:
            otp_verification.otp_code = otp_code
            otp_verification.save()

        subject = 'Password Reset OTP'
        message = """Dear """+email+""",

        You recently requested a password reset for your account. Here is your One-Time Password (OTP):
        OTP: """ + otp_code + """
        
        Please use this code to complete the password reset process. 
        If you did not initiate this request, kindly disregard this message.
        
        If you have any questions or need further assistance, please don't hesitate to contact us.
        
        Best regards,
        """+email
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [email]  # List of recipient email addresses
        send_mail(subject, message, from_email, recipient_list)
        return Response(email, status=200)


@api_view(['POST'])
def otpverification(request):
    user_otp = request.data.get('otp')
    user_email = request.data.get('email')

    try:
        otp_verification = OTPVerification.objects.select_related('user').get(user__email=user_email)
    except OTPVerification.DoesNotExist:
        return Response(status=400)

    if otp_verification.otp_code == user_otp:
        return Response(status=200)
    else:
        return Response(status=400)


@api_view(['POST'])
def resetpassword(request):
    user_email = request.data.get('email')
    new_password = request.data.get('newpassword')

    users = User.objects.filter(email=user_email)
    for user in users:
        user.password = make_password(new_password)

    # Perform a batch update using bulk_update()
    with transaction.atomic():
        User.objects.bulk_update(users, ['password'])
    
    # Delete the verified OTPs in one query
    OTPVerification.objects.filter(user_id=user.id).delete()
    return Response(status=200)


@api_view(['POST'])
def contactus(request):
    username = request.data.get('username')
    email = request.data.get('email')
    message = request.data.get('message')
    contact=ContactUs(username=username,email=email, message=message)
    contact.save()
    return Response(status=200)