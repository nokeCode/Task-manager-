from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

# Create your views here.

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    @action(detail=True, methods=['post'])
    def change_status(self, request, pk=None):
        task = self.get_object()
        new_status = request.data.get('status')
        if new_status in dict(Task.STATUS_CHOICES):
            task.status = new_status
            task.save()
            return Response({'status': 'updated', 'new_status': new_status})
        return Response({'error': 'Invalid status'}, status=400)
    
    @action(detail=False, methods=['get'])
    def by_status(self, request):
        status = request.query_params.get('status', 'todo')
        tasks = Task.objects.filter(status=status)
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)