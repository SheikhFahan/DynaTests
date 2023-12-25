from django.urls import path, include

from .views import GroupTestCreateAPIView, QuestionsRetrieveAPIView

urlpatterns = [
    path('create_group_test', GroupTestCreateAPIView.as_view()),
    path('<int:category>/get_test/',QuestionsRetrieveAPIView.as_view()), 

]
