from django.db import models
from django.contrib.auth.models import User

from group_tests.models import GroupTestCategory, GroupTestCombinedCategory

# change profile to user as the foreign key relation

    
class InstituteProfile(models.Model):
    """
    saves profile information for colleges
    """
    # try finding api for university and college names
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    college_name = models.CharField(max_length= 100, null= True)
    email = models.EmailField(max_length= 30)
    phone = models.IntegerField()
    university_name = models.CharField(max_length= 100, null= True)
    address = models.CharField(max_length=255, blank=True, null=True)


class GroupTestScoresLibrary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    category = models.ForeignKey(GroupTestCategory, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

    @classmethod
    def update_average_score(cls, user, GroupTestCategory):
        avg_score = cls.objects.filter(category = GroupTestCategory, user = user).aggregate(models.Avg('score'))['score__avg']
        GroupTestAverageScore.objects.update_or_create(user= user, category = GroupTestCategory, defaults={'avg_score' : avg_score} )

    def __str__(self) :
        return f"{self.user}, {self.category}, {self.score}"
    
    
class GroupTestAverageScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(GroupTestCategory, on_delete=models.CASCADE)
    avg_score = models.IntegerField()
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['category', 'user']

    def __str__(self) :
        return f"{self.user}, {self.category}, {self.avg_score}"
    
class GroupTestMarksLibrary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    category = models.ForeignKey(GroupTestCategory, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self) :
        return f"{self.user}, {self.category}, {self.score}"


class CombinedGroupTestScoresLibrary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    category = models.ForeignKey(GroupTestCombinedCategory, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self) :
        return f"{self.user}, {self.category}, {self.score}"

