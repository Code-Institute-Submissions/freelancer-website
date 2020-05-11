from django.db import models
from django.contrib.auth.models import User
from checkout.models import OrderModel
from services.models import Services
# Create your models here.


class ProjectModel(models.Model):
    deadline_date = models.DateField(null=False)
    owner = models.ForeignKey(
        User, related_name="projects", on_delete=models.CASCADE, null=True)
    width = models.DecimalField(max_digits=5, decimal_places=2)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    concept_amount = models.DecimalField(max_digits=5, decimal_places=2)
    colors = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    finished = models.BooleanField(default=False)
    order = models.ForeignKey(OrderModel, on_delete=models.CASCADE, null=False)
    image = models.FileField(upload_to='image', null=True)
    project_type = models.ForeignKey(
        Services, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"{self.project_type.name} by {self.owner}"
