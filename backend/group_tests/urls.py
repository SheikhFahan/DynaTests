from django.urls import path, include

from .views import GroupTestCreateAPIView, QuestionsRetrieveAPIView, SubmitAnswersAPIView, GroupTestCategoryListAPIView, PasswordCreateAPIView

urlpatterns = [
    path('group_test_categories', GroupTestCategoryListAPIView.as_view()),
    path('create_group_test', GroupTestCreateAPIView.as_view()),
    path('create_group_test_passwords', PasswordCreateAPIView.as_view()),
    path('<int:category>/get_test/',QuestionsRetrieveAPIView.as_view()), 
    path('submit_ans/', SubmitAnswersAPIView.as_view() ),


]
