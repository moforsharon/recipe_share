from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, RecipeViewSet, ReviewViewSet, MealViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'meals', MealViewSet)
router.register(r'recipes', RecipeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('recipes/<slug:recipe_slug>/reviews/', ReviewViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('recipes/<slug:recipe_slug>/reviews/<int:pk>/', ReviewViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    })),
]

