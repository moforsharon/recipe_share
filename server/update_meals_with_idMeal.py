import os
import django
import requests
from time import sleep

# Set up Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

# Now you can import Django models
from apps.recipes.models import Category, Meal

def update_meals_with_idMeal():
    # Fetch all categories from the database
    categories = Category.objects.all()
    
    for category in categories:
        # Fetch meals for the current category
        url = f"https://www.themealdb.com/api/json/v1/1/filter.php?c={category.name}"
        try:
            response = requests.get(url, timeout=10)  # Add a timeout
            response.raise_for_status()  # Raise an error for bad status codes
        except requests.exceptions.RequestException as e:
            print(f"Failed to fetch meals for category '{category.name}': {e}")
            continue
        
        data = response.json()
        meals = data.get("meals", [])
        
        for meal_data in meals:
            # Extract data from the API response
            name = meal_data.get("strMeal")
            idMeal = meal_data.get("idMeal")
            
            # Find the matching meal in the database
            try:
                meal = Meal.objects.get(name=name)
                if not meal.meal_id:  # Update only if idMeal is not already set
                    meal.meal_id = idMeal
                    meal.save()
                    print(f"Updated meal '{name}' with idMeal={idMeal}")
                else:
                    print(f"Meal '{name}' already has idMeal={meal.idMeal}. Skipping.")
            except Meal.DoesNotExist:
                print(f"Meal '{name}' not found in the database. Skipping.")

if __name__ == "__main__":
    update_meals_with_idMeal()