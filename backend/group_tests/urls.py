from django.urls import path, include

from .views import (
    GroupTestListCreateAPIView, QuestionsRetrieveAPIView, 
    SubmitAnswersAPIView, GroupTestCategoryListCreateAPIView, PasswordCreateAPIView, 
    GroupTestCombinedCategoryListCreateAPIView
)

urlpatterns = [
    path('group_test_combined_categories', GroupTestCombinedCategoryListCreateAPIView.as_view()),
    path('group_test_categories', GroupTestCategoryListCreateAPIView.as_view()),
    path('sub_group_test', GroupTestListCreateAPIView.as_view()),
    path('create_group_test_passwords', PasswordCreateAPIView.as_view()),
    path('<int:category>/get_test/',QuestionsRetrieveAPIView.as_view()), 
    path('submit_ans/', SubmitAnswersAPIView.as_view() ),
    

]
