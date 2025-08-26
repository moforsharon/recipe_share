from rest_framework import serializers
from .models import Category, Recipe, Review, Meal
from django.contrib.auth import get_user_model

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'profile_image']


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'user', 'rating', 'comment', 'created_at']
        read_only_fields = ['user']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class RecipeSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), 
        write_only=True
    )
    author = UserSerializer(read_only=True)
    reviews_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Recipe
        fields = [
            'id', 'title', 'slug', 'description', 'ingredients', 'instructions',
            'prep_time', 'cook_time', 'servings', 'image', 'category', 'category_id',
            'author', 'created_at', 'updated_at', 'is_published', 'nutrition',
            'reviews_count', 'average_rating'
        ]
        read_only_fields = ['author', 'slug']
    
    def get_reviews_count(self, obj):
        return obj.reviews.count()
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if not reviews:
            return None
        return sum(review.rating for review in reviews) / len(reviews)
    
    def create(self, validated_data):
        category = validated_data.pop('category_id')
        validated_data['category'] = category
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)


class RecipeDetailSerializer(RecipeSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ['reviews']

class MealSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Meal
        fields = ['id', 'name', 'slug', 'image', 'category', 'category_name', 'meal_id', 'servings', 'prep_time', 'cook_time', 'created_at', 'updated_at']