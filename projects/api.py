from .serializers import ProjectSerializer, PublicProjectsSerializer, ProjectChangesSerializer
from rest_framework.decorators import action
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .models import ProjectModel, ProjectChangesModel, PublicProjectModel
from django.shortcuts import get_object_or_404


class ProjectView(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer

    @action(detail=False, permissions=[permissions.IsAuthenticated])
    def list(self, request):
        queryset = self.request.user.projects.all().order_by('-ordered_at')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, permissions=[permissions.IsAuthenticated])
    def retrieve(self, request, pk):
        queryset = get_object_or_404(ProjectModel, pk=pk)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


class PublicProjectView(viewsets.ModelViewSet):

    @action(detail=True, permissions=[permissions.IsAuthenticated])
    def create(self, request):
        profile = self.request.user.profile.get()
        first_name = profile.first_name
        last_name = profile.last_name

        serializer = PublicProjectsSerializer
        public_project_new = serializer(data={
            **request.data,
            "owner_name": f"{first_name} {last_name}"
        })
        public_project_new.is_valid(raise_exception=True)
        public_project_new.save(owner=self.request.user)
        project = get_object_or_404(
            ProjectModel, pk=request.data.get('project_id'))
        project.approved = True
        project.save()
        return Response(data=public_project_new.data)

    @action(detail=False)
    def list(self, request):
        query = PublicProjectModel.objects.all()

        serializer = PublicProjectsSerializer(query, many=True)
        return Response(serializer.data)


class ProjectChangeView(viewsets.ModelViewSet):
    @action(detail=True, permissions=[permissions.IsAuthenticated])
    def create(self, request, pk):
        project = get_object_or_404(ProjectModel, pk=pk)
        serializer = ProjectChangesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(project_id=project)
        return Response(serializer.data)

    @action(detail=False, permissions=[permissions.IsAuthenticated])
    def list(self, request, pk):
        project = get_object_or_404(ProjectModel, pk=pk)
        queryset = project.project_changes.all()
        serializer = ProjectChangesSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, permissions=[permissions.IsAuthenticated])
    def destroy(self, request, pk):
        project_change = get_object_or_404(ProjectChangesModel, pk=pk)

        project_change.delete()
        return Response({'message': 'success'})
