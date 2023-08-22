# todo_app/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, UserRegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

router = DefaultRouter()
router.register(r'todo', TodoViewSet, basename='todo')

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls)),
    path('user-todos/', TodoViewSet.as_view({'get': 'user_todos'}), name='user_todos'),
]
