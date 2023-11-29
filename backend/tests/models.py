from django.db import models
import pandas as pd

# for dynamic foreign keys
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Category(models.Model):
    name = models.CharField(max_length=15)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Test(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    title = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=10,choices= DIFFICULTY_CHOICES)
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
            choice1, choice2, choice3, choice4 = row['A'], row['B'], row['C'], row['D']
            correct_answer = row['Answer']

            
            # for dynamic foreign key(not usefull for now)
                # getting the foreign key reference 
                # content_type = ContentType.objects.get_for_model(self)
                # create the question object
                # question = Question.objects.get_or_create(content_type = content_type, object_id = self.id, text=question_text)

            if(self.difficulty == 'easy'):
                question = EasyQuestion.objects.get_or_create(test=self, text=question_text)
                choice_1 = ChoiceForEasyQ.objects.get_or_create(question=question[0], text=choice1, is_correct=correct_answer == 'A')
                choice_2 = ChoiceForEasyQ.objects.get_or_create(question=question[0], text=choice2, is_correct=correct_answer == 'B')
                choice_3 = ChoiceForEasyQ.objects.get_or_create(question=question[0], text=choice3, is_correct=correct_answer == 'C')
                choice_4 = ChoiceForEasyQ.objects.get_or_create(question=question[0], text=choice4, is_correct=correct_answer == 'D')
                
            elif(self.difficulty == 'medium'):
                question = MediumQuestion.objects.get_or_create(test=self, text=question_text)
                choice_1 = ChoiceForMediumQ.objects.get_or_create(question=question[0], text=choice1, is_correct=correct_answer == 'A')
                choice_2 = ChoiceForMediumQ.objects.get_or_create(question=question[0], text=choice2, is_correct=correct_answer == 'B')
                choice_3 = ChoiceForMediumQ.objects.get_or_create(question=question[0], text=choice3, is_correct=correct_answer == 'C')
                choice_4 = ChoiceForMediumQ.objects.get_or_create(question=question[0], text=choice4, is_correct=correct_answer == 'D')

            elif(self.difficulty =='hard'):
                question = HardQuestion.objects.get_or_create(test=self, text=question_text)
                choice_1 = ChoiceForHardQ.objects.get_or_create(question=question[0], text=choice1, is_correct=correct_answer == 'A')
                choice_2 = ChoiceForHardQ.objects.get_or_create(question=question[0], text=choice2, is_correct=correct_answer == 'B')
                choice_3 = ChoiceForHardQ.objects.get_or_create(question=question[0], text=choice3, is_correct=correct_answer == 'C')
                choice_4 = ChoiceForHardQ.objects.get_or_create(question=question[0], text=choice4, is_correct=correct_answer == 'D')




class EasyQuestion(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    text = models.TextField()

    # generic-foreign-key
    # content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    # object_id = models.PositiveIntegerField()
    # test = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return self.text[:50]
    
class MediumQuestion(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text[:50]
    
class HardQuestion(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text[:50]
    
class ChoiceForEasyQ(models.Model):
    question = models.ForeignKey(EasyQuestion, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.question.text[:50]}, {self.text[:20]}"
    
class ChoiceForMediumQ(models.Model):
    question = models.ForeignKey(MediumQuestion, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.question.text[:50]}, {self.text[:20]}"
    
class ChoiceForHardQ(models.Model):
    question = models.ForeignKey(HardQuestion, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.question.text[:50]}, {self.text[:20]}"
    

# make changes in the database 
