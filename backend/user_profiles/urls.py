from django.urls import path
from .views import (
    ProfileRetrieveAPIView , CategoryRetrieveSerializer
    )
urlpatterns = [
    path('profile/', ProfileRetrieveAPIView.as_view() ),
    path('categories/', CategoryRetrieveSerializer.as_view() ),
]