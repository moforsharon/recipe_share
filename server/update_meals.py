import os
import django

# Set up Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

# Now you can import Django models
from apps.recipes.models import Meal

def update_meals_with_category_name():
    # Fetch all meals
    meals = Meal.objects.all()
    
    for meal in meals:
        # Set the category_name field to the category's name
        meal.category_name = meal.category.name
        meal.save()
        print(f"Updated meal '{meal.name}' with category name '{meal.category_name}'")

if __name__ == "__main__":
    update_meals_with_category_name()