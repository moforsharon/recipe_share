import os
import django
import random

# Set up Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

# Now you can import Django models
from apps.recipes.models import Meal

def populate_meal_fields():
    # Fetch all meals
    meals = Meal.objects.all()
    
    for meal in meals:
        # Randomly populate the fields
        meal.servings = random.randint(2, 4)  # Random value between 2 and 4
        meal.prep_time = random.choice([10, 15, 20])  # Random value from [10, 15, 20]
        meal.cook_time = random.choice([10, 15, 20, 25, 40, 45])  # Random value from [10, 15, 20, 25, 40, 45]
        meal.save()
        print(f"Updated meal '{meal.name}' with servings={meal.servings}, prep_time={meal.prep_time}, cook_time={meal.cook_time}")

if __name__ == "__main__":
    populate_meal_fields()