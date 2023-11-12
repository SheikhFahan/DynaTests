from django.db import models
import pandas as pd

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=15)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

class Test(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    test_file = models.FileField(upload_to='media/test_files/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.test_file:
            self.import_quiz_from_excel()

    #extract excel file
    def import_quiz_from_excel(self):
        # read the excel file
        df = pd.read_excel(self.test_file.path)

        # iterate over the each row
        for index, row in df.iterrows():
            # extract question text, choices and correct answer from the row
            question_text = row['Question']
            choice1 = row['A']
            choice2 = row['B']
            choice3 = row['C']
            choice4 = row['D']
            correct_answer = row['Answer']

            # create the question object
            question = Question.objects.get_or_create(quiz=self, text=question_text)

            # create choices objects
            choice_1 = Choice.objects.get_or_create(question=question[0], text=choice1, is_correct=correct_answer == 'A')
            choice_2 = Choice.objects.get_or_create(question=question[0], text=choice2, is_correct=correct_answer == 'B')
            choice_3 = Choice.objects.get_or_create(question=question[0], text=choice3, is_correct=correct_answer == 'C')
            choice_4 = Choice.objects.get_or_create(question=question[0], text=choice4, is_correct=correct_answer == 'D')

class Question(models.Model):
    quiz = models.ForeignKey(Test, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text[:50]
    
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.question.text[:50]}, {self.text[:20]}"