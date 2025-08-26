import Image from "next/image";import { Clock, Users, ChefHat, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecipeDetails } from "../interface"

async function getRecipe(id: string): Promise<RecipeDetails> {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data = await res.json();
  const meal = data.meals[0]; 

  if (!meal) {
    throw new Error("Recipe not found");
  }

  // Format ingredients and measurements
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  // Format instructions into steps
  const instructions: string[] = meal.strInstructions
    .split("\r\n")
    .filter((step: string) => step.trim());

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    description: meal.strCategory,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    prep_time: 20, 
    cook_time: 40, 
    servings: 4, 
    ingredients,
    instructions,
    video: meal.strYoutube,
    tags: meal.strTags ? meal.strTags.split(",") : [],
  };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const recipe: RecipeDetails = await getRecipe(params.id);

  return {
    title: `${recipe.title} - RecipeShare`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [{ url: recipe.image }],
    },
  };
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe: RecipeDetails = await getRecipe(params.id);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Badge className="mb-4">{recipe.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{recipe.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span>From {recipe.area}</span>
            </div>

            <Button variant="outline" size="sm" className="ml-auto gap-2">
              <Bookmark className="h-4 w-4" />
              Save Recipe
            </Button>
          </div>
        </div>

        <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
          <Image
            src={recipe.image || "/placeholder.svg?height=384&width=768"}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
            <Clock className="h-6 w-6 mb-2" />
            <span className="text-sm">Prep Time</span>
            <span className="font-bold">{recipe.prep_time} mins</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
            <ChefHat className="h-6 w-6 mb-2" />
            <span className="text-sm">Cook Time</span>
            <span className="font-bold">{recipe.cook_time} mins</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
            <Users className="h-6 w-6 mb-2" />
            <span className="text-sm">Servings</span>
            <span className="font-bold">{recipe.servings}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="block h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-6">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div>
                  <p>{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {recipe.video && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Video</h2>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${recipe.video.split("v=")[1]}`}
                title={recipe.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
