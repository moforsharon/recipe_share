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
from apps.recipes.models import Category

def fetch_and_save_categories():
    # Fetch data from the API
    url = "https://www.themealdb.com/api/json/v1/1/categories.php"
    response = requests.get(url)
    
    if response.status_code != 200:
        print(f"Failed to fetch data: {response.status_code}")
        return
    
    data = response.json()
    categories = data.get("categories", [])
    
    for category_data in categories:
        # Extract data from the API response
        name = category_data.get("strCategory")
        description = category_data.get("strCategoryDescription")
        image_url = category_data.get("strCategoryThumb")
        
        # Check if the category already exists
        if Category.objects.filter(name=name).exists():
            print(f"Category '{name}' already exists. Skipping.")
            continue
        
        # Download the image with retry logic
        max_retries = 3
        retry_count = 0
        image_response = None
        
        while retry_count < max_retries:
            try:
                # Stream the image download
                image_response = requests.get(image_url, stream=True)
                image_response.raise_for_status()  # Raise an error for bad status codes
                break  # Exit the retry loop if successful
            except requests.exceptions.RequestException as e:
                retry_count += 1
                print(f"Attempt {retry_count} failed for category '{name}': {e}")
                if retry_count < max_retries:
                    sleep(2)  # Wait before retrying
                else:
                    print(f"Failed to download image for category '{name}' after {max_retries} attempts. Skipping.")
                    continue
        
        # Use Python's NamedTemporaryFile
        with NamedTemporaryFile(delete=True) as image_temp:
            # Write the image content in chunks
            for chunk in image_response.iter_content(chunk_size=8192):
                if chunk:  # Filter out keep-alive chunks
                    image_temp.write(chunk)
            image_temp.flush()
            
            # Create and save the Category instance
            category = Category(
                name=name,
                description=description,
            )
            category.image.save(f"{name}.jpg", File(image_temp), save=True)
            category.save()
            
            print(f"Saved category: {name}")

if __name__ == "__main__":
    fetch_and_save_categories()