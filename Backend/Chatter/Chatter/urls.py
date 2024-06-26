"""
URL configuration for Chatter project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
import chat.routing

urlpatterns = [
    path('', include('home.urls')),
    path('', include('sign_up.urls')),
    path('', include('user_profile.urls')),
    path('', include('search.urls')),
    path('', include('post.urls')),
    path('', include('hashtag.urls')),
    path('', include('friend_post.urls')),
    path('', include('feedback.urls')),
    path('', include('chat.urls')),
    path('', include('ads.urls')),
    path('admin/', admin.site.urls),
    path('ws/', include(chat.routing.websocket_urlpatterns)),
]

if settings.DEBUG:
    urlpatterns+= path("__debug__/", include("debug_toolbar.urls")),