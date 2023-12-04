from django.urls import path
from . import views

app = 'sanpomap'
urlpatterns = [
    path('', views.Login, name='Login'),
    path("logout",views.Logout,name="Logout"),
    path('register',views.AccountRegistration.as_view(), name='register'),
    path("home",views.home,name="home"),
    path('main/', views.home, name='main'),
    path('sanpomap/', views.sanpomap, name='sanpomap'),
    path('history/', views.history, name='history'),
]