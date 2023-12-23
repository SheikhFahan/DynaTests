from django.urls import path
from .views import (
    CategoriesListAPIView, QuestionsRetrieveAPIView,
    SubmitAnswersAPIView, CombinationTestListCreateAPIView,
    CombinationTestQuestionsListSerializerAPIView,
    SubmitCombinationAnswersAPIView)
urlpatterns = [
    path('categories/',CategoriesListAPIView.as_view() ),
    path('test_combination/', CombinationTestListCreateAPIView.as_view() ),
    path('<int:category>/get_comb_test/',CombinationTestQuestionsListSerializerAPIView.as_view()),
    path('<int:category>/get_test/',QuestionsRetrieveAPIView.as_view()),
    path('submit_ans/', SubmitAnswersAPIView.as_view() ),
    path('submit_comb_ans/', SubmitCombinationAnswersAPIView.as_view() ),

    # path()


]