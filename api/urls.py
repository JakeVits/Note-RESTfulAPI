from api import views
from django.urls import path
from knox import views as knox_views

urlpatterns = [
    path('api/register/', views.register_api, name='register'),
    path('api/login/', views.login_api, name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutView.as_view(), name='logoutall'),

    path('api/profile/', views.profile_api, name='profile-api'),
    path('api/note-list/', views.NoteListAPIView.as_view(), name='list-note'),
    path('api/note-update/<pk>/', views.NoteUpdateAPIView.as_view(), name='update-note'),
    path('api/note-delete/<pk>/', views.NoteDeleteAPIView.as_view(), name='delete-note'),
]