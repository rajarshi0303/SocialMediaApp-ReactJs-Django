# Fullstack SocialMediaApp
SocialMediaApp is a unique social media web application built using ReactJS for the front end and Django for the back end. This application emphasizes privacy and fun by allowing users to remain anonymous and use cute animal avatars instead of their real image and name. It offers a refreshing twist on traditional social media platforms, making it a fun and engaging space for users to interact

## ✨ Features
* User Authentication: Sign up, log in, and manage your profile securely.
* Post Creation: Users can create, edit, and delete posts.
* Interactivity: Users can Comment, rate, and share posts.
* Anonymous Posting: Users can post content anonymously using animal avatars.
* Real-Time Messaging: Instant messaging feature to chat with other users.
* Profile Customization: Customize your profile with animal avatars and bios.
* Privacy Settings: Control who can see your posts and send you messages.
* Search Functionality: Find users and content quickly.
* Media Uploads: Share text, images, videos, audio and more with your posts.
* Post Rating and Feedback: Rate posts and leave detailed feedback, enhancing interaction and content quality
* Responsive Design: Mobile-friendly and works seamlessly on various devices.

  ## 🛠️ Technologies Used
* Frontend: HTML5, TailwindCSS, React.js, Framer-motion(animation) 
* Backend: Django, Django REST Framework, Django Channels (for WebSocket support), Django Debug Toolbar, MySQL client
* Database: MySQL
* APIs: REST API with Django REST Framework

## Installation Guide

### Requirements
* Node.js
* Python
* MySQl


### Steps
#### Clone the Repository
```shell
git clone git clone https://github.com/rajarshi0303/SocialMediaApp-ReactJs-Django.git
cd SocialMediaApp-ReactJs-Django
```

#### Set up the Frontend (ReactJs)
```shell
cd Frontend
npm install
```
Start the React development server:
```shell
npm run dev
```

#### Set up the Backend (Django)
Activate virtual environment 
```shell
cd Backend
myworld\Scripts\activate.bat
```
Install Dependencies
```shell
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install channels
pip install daphne
pip install django-cors-headers
pip install mysqlclient
pip install django-debug-toolbar
```
Update backend/settings.py with your MySQL credentials
```shell
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'demo',  # Replace with your database name
        'USER': 'root',  # Replace with your MySQL user
        'PASSWORD': 'your_strong_password',  # Replace with your MySQL password
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

Update backend/settings.py with your Email credentials
```shell
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = ''
```

Apply database migrations
```shell
python manage.py makemigrations
python manage.py migrate
```
Create a superuser account for administrative access
```shell
python manage.py createsuperuser
```
Run the Django development server
```shell
python manage.py runserver
```
## Usage
* Sign Up: Create an account and set up your profile.
* Explore: Explore the feed, discover new posts and interact with other users.
* Interact: Like, comment on, and share posts with others.
* Messaging: Send and receive messages from other users.
* Stay anonymous while enjoying a safe and engaging social media experience.

## Contributing
We welcome contributions to this project to enhance functionality and improve it. Please create pull requests to share your improvements and bug fixes.
