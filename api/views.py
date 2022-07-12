from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from knox.models import AuthToken
from api.models import Profile, Note
from api.serializers import LoginSerializer, NoteSerializer, RegisterSerializer, ProfileSerializer, UserSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login, logout
from rest_framework import permissions
from knox.views import LoginView as KnoxLoginView


class LoginAPI(generics.GenericAPIView, KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        _, token = AuthToken.objects.create(user)
        login(request, user)
        return Response({
            'username': user.username,
            'token': token
        })


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # "token": AuthToken.objects.create(user)[1]
            "message": "User registration successful!"
        })


@api_view(['POST'])
def logout_api(request):
    logout(request)
    return Response({'status': 200})


@api_view(['GET', 'PUT', 'DELETE'])
# @authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile_api(request):
    obj = profile = Profile.objects.get(user=request.user)
    if request.method == 'PUT':
        profile = ProfileSerializer(instance=profile, data=request.data)
        if profile.is_valid(): profile.save()
    if request.method == 'DELETE':
        profile.gender = ''
        profile.nationality = ''
        profile.occupation = ''
        profile.yoe = 0
        profile.save()
    return Response({
        'gender': obj.gender,
        'nationality': obj.nationality,
        'occupation': obj.occupation,
        'yoe': obj.yoe
    })


class NoteListAPIView(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)


class NoteCreateAPIView(generics.CreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({'user': str(request.user)})

    def create(self, request, *args, **kwargs):
        note = Note.objects.create(
            owner=request.user, title=request.data['title'], content=request.data['content']
        )
        return Response({'id': note.id, 'title': note.title, 'content': note.content})


class NoteUpdateAPIView(generics.UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            note = Note.objects.get(id=self.kwargs['pk'])
            if note.owner != self.request.user: return None
            return note
        except: return None
    def get(self, request, *args, **kwargs):
        note = self.get_object() 
        if note == None: return Response({'error': 'Note id is not found!'})
        return Response({
            'id': note.id,
            'title': note.title,
            'content': note.content
        })

class NoteDeleteAPIView(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            note = Note.objects.get(id=self.kwargs['pk'])
            if note.owner != self.request.user: return None
            return note
        except: return None
    def delete(self, request, *args, **kwargs):
        note = self.get_object()
        if note == None: return Response({'error': 'Note id is not found!'})
        note.delete()
        return Response({'status': 'Deleted Successfully!'})
    def get(self, request, *args, **kwargs):
        note = self.get_object() 
        if note == None: return Response({'error': 'Note id is not found!'})
        return Response({
            'id': note.id,
            'title': note.title,
            'content': note.content
        })


# @api_view(['POST'])
# def login_api(request):
#     serializer = AuthTokenSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     user = serializer.validated_data['user']
#     _, token = AuthToken.objects.create(user)
#     login(request, user)
#     return Response({
#         'username': user.username,
#         'token': token
#     })

# @api_view(['POST'])
# def register_api(request):
#     serializer = RegisterSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     user = serializer.save()
#     _, token = AuthToken.objects.create(user)
#     login(request, user)
#     return Response({
#         'username': user.username,
#         'token': token
#     })