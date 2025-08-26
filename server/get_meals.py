import os
import django
import requests
from django.core.files import File
from tempfile import NamedTemporaryFile
from time import sleep

# Set up Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

# Now you can import Django models
from apps.recipes.models import Category, Meal

def fetch_and_save_meals():
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
            image_url = meal_data.get("strMealThumb")
            
            # Check if the meal already exists
            if Meal.objects.filter(name=name).exists():
                print(f"Meal '{name}' already exists. Skipping.")
                continue
            
            # Download the image with retry logic
            max_retries = 3
            retry_count = 0
            image_response = None
            
            while retry_count < max_retries:
                try:
                    # Stream the image download with a smaller chunk size
                    image_response = requests.get(image_url, stream=True, timeout=10)
                    image_response.raise_for_status()  # Raise an error for bad status codes
                    break  # Exit the retry loop if successful
                except requests.exceptions.RequestException as e:
                    retry_count += 1
                    print(f"Attempt {retry_count} failed for meal '{name}': {e}")
                    if retry_count < max_retries:
                        sleep(2)  # Wait before retrying
                    else:
                        print(f"Failed to download image for meal '{name}' after {max_retries} attempts. Skipping.")
                        continue
            
            # Use Python's NamedTemporaryFile
            try:
                with NamedTemporaryFile(delete=True) as image_temp:
                    # Write the image content in smaller chunks
                    for chunk in image_response.iter_content(chunk_size=1024):  # Smaller chunk size
                        if chunk:  # Filter out keep-alive chunks
                            image_temp.write(chunk)
                    image_temp.flush()
                    
                    # Create and save the Meal instance
                    meal = Meal(
                        name=name,
                        category=category,
                    )
                    meal.image.save(f"{name}.jpg", File(image_temp), save=True)
                    meal.save()
                    
                    print(f"Saved meal: {name}")
            except Exception as e:
                print(f"Failed to save meal '{name}': {e}")

if __name__ == "__main__":
    fetch_and_save_meals()