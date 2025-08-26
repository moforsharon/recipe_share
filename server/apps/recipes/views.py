from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Recipe, Review
from .serializers import CategorySerializer, RecipeSerializer, RecipeDetailSerializer, ReviewSerializer
from .permissions import IsAuthorOrReadOnly
from .models import Meal
from .serializers import MealSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    
    @action(detail=True, methods=['get'])
    def recipes(self, request, slug=None):
        category = self.get_object()
        recipes = Recipe.objects.filter(category=category, is_published=True)
        serializer = RecipeSerializer(recipes, many=True, context={'request': request})
        return Response(serializer.data)


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.filter(is_published=True)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'author']
    search_fields = ['title', 'description', 'ingredients']
    ordering_fields = ['created_at', 'prep_time', 'cook_time']
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return RecipeDetailSerializer
        return RecipeSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
    
    @action(detail=True, methods=['post'])
    def review(self, request, slug=None):
        recipe = self.get_object()
        serializer = ReviewSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save(recipe=recipe, user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    
    def get_queryset(self):
        return Review.objects.filter(recipe__slug=self.kwargs['recipe_slug'])
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['get'])
    def recipes(self, request, slug=None):
        meal = self.get_object()
        recipes = Recipe.objects.filter(meal=meal, is_published=True)
        serializer = RecipeSerializer(recipes, many=True, context={'request': request})
        return Response(serializer.data)
