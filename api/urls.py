from api import views
from django.urls import path
from knox import views as knox_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.RegisterAPI.as_view(), name='register'),
    # path('api/login/', views.LoginAPI.as_view(), name='login'),
    path('api/logout/', views.logout_api, name='logout'),
    # path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    # path('api/logoutall/', knox_views.LogoutView.as_view(), name='logoutall'),

    path('api/profile/', views.profile_api, name='profile-api'),
    path('api/list-note/', views.NoteListAPIView.as_view(), name='list-note'),
    path('api/add-note/', views.NoteCreateAPIView.as_view(), name='add-note'),
    path('api/update-note/<pk>/', views.NoteUpdateAPIView.as_view(), name='update-note'),
    path('api/delete-note/<pk>/', views.NoteDeleteAPIView.as_view(), name='delete-note'),
]