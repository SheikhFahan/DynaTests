from django.urls import path

from . import views


from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView
)


urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('create_user/', views.UserCreateAPIView.as_view(), name = 'create_user'),
    path('create_institute_user/', views.InstituteUserCreateAPIView.as_view(), name = 'create_institute_user'),
]