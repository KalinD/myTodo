import json

from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.views.generic.base import TemplateView, View
from django.shortcuts import render
from .models import Todo


class TodosView(View):
    template_name = 'todo/todos.html'

    def get(self, request):
        context = {
            'todos': Todo.objects.all().order_by('-updated_at')
        }
        return render(request, self.template_name, context)


def get_object(pk):
    try:
        return Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        raise Http404


class TodoView(View):
    template_name = 'todo/index.html'

    def put(self, request, pk):
        todo = get_object(pk)
        if request.body:
            data = json.loads(request.body)
            todo.text = data['text']
        else:
            todo.completed = not todo.completed
        todo.save()
        return HttpResponseRedirect('/todos/')

    def post(self, request):
        todo = Todo.objects.create()
        data = json.loads(request.body)
        todo.text = data['text']
        todo.save()
        return HttpResponseRedirect('/todos/')

    def delete(self, request, pk):
        todo = get_object(pk)
        todo.delete()
        return HttpResponse(status=204)
