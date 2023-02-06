from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.TodosView.as_view(), name='index'),
    path('todo/', views.TodoView.as_view(), name='todo'),
    path('todo/<str:pk>/', views.TodoView.as_view(), name='todo'),
]
