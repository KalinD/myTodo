from django.db import models


class Todo(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.text
