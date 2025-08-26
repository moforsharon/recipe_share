import Link from "next/link"
import { RecipeCard } from "@/components/recipe-card"
import { SearchBar } from "@/components/search-bar"
import { FeaturedRecipe } from "@/components/featured-recipe"

export const metadata = {
  title: "RecipeShare - Discover and Share Delicious Recipes",
  description: "Find and share your favorite recipes with a community of food lovers",
  openGraph: {
    title: "RecipeShare - Discover and Share Delicious Recipes",
    description: "Find and share your favorite recipes with a community of food lovers",
    images: [{ url: "/og-image.jpg" }],
  },
}

interface Recipe {
  id: string
  name: string
  description: string
  image: string
  prep_time: number
  cook_time: number
  servings: number
  category: string
  category_name: string
  meal_id: string
  author: {
    name: string
    image: string
  }
}

async function getRecipes() {
  try {
    // In production, this would fetch from your API
    const res = await fetch("http://localhost:8000/api/meals/", { next: { revalidate: 3600 } });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch recipes");
    }

    // Await the JSON parsing
    const data = await res.json();
    console.log(data); 
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error; // Re-throw the error to handle it elsewhere
  }
}

export default async function Home() {
  const recipes = await getRecipes()
  const featuredRecipe = recipes[70] 

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">Discover Delicious Recipes</h1>
        <SearchBar />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Recipe</h2>
        <FeaturedRecipe recipe={featuredRecipe} />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Latest Recipes</h2>
          <Link href="/categories" className="text-primary hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RecipeCard key={recipes[0].meal_id} recipe={recipes[0]} />
          <RecipeCard key={recipes[41].meal_id} recipe={recipes[41]} />
          <RecipeCard key={recipes[47].meal_id} recipe={recipes[47]} />
          <RecipeCard key={recipes[50].meal_id} recipe={recipes[50]} />
          <RecipeCard key={recipes[69].meal_id} recipe={recipes[69]} />
          <RecipeCard key={recipes[97].meal_id} recipe={recipes[97]} />
          <RecipeCard key={recipes[120].meal_id} recipe={recipes[120]} />
        </div>
      </section>
    </main>
  )
}

