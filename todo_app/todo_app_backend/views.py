# todo_app/views.py

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import TodoItem
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def user_todos(self, request):
        todos = TodoItem.objects.filter(user=request.user)
        serializer = self.get_serializer(todos, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response({'detail': 'You do not have permission to delete this item.'}, status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserRegistrationView(APIView):

    @staticmethod
    def post(request):
        data = request.data
        if 'username' in data and 'password' in data:
            username = data['username']
            password = data['password']
            hashed_password = make_password(password)

            if User.objects.filter(username=username).exists():
                return Response({'detail': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            new_user = User(username=username, password=hashed_password)
            new_user.save()
            return Response({'detail': 'User registered successfully'}, status=status.HTTP_201_CREATED)

        return Response({'detail': 'Missing username or password'}, status=status.HTTP_400_BAD_REQUEST)
