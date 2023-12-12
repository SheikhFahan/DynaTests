from django.urls import path
from .views import (
    CategoriesListAPIView, EasyQuestionListAPIView,
    MediumQuestionListAPIView, QuestionsRetrieveAPIView,
    SubmitAnswersAPIView, BetaQuestionsRetrieveAPIView
)
urlpatterns = [
    path('categories/',CategoriesListAPIView.as_view() ),
    path('<int:pk>/get_test/',QuestionsRetrieveAPIView.as_view()),
    path('submit_ans/', SubmitAnswersAPIView.as_view() ),
    path('question_list/', BetaQuestionsRetrieveAPIView.as_view()),
    # path()


]