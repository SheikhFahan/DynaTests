from django.urls import path
from .views import (
    ProfileRetrieveAPIView , CategoryRetrieveSerializer, TestMarksLibraryListAPIView
    )
urlpatterns = [
    path('profile/', ProfileRetrieveAPIView.as_view() ),
    path('categories/', CategoryRetrieveSerializer.as_view() ),
    path('<int:category>/marks/', TestMarksLibraryListAPIView.as_view() ),

]