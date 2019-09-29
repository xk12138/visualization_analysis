from django.db import models

# Create your models here.
class Movies(models.Model):
    name = models.CharField(max_length=50)
    hero_name = models.CharField(max_length=50)
    content = models.CharField(max_length=1000)
    pub_date = models.DateTimeField()

    def __str__(self):
        return self.name