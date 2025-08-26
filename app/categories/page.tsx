// src/app/categories/page.tsx
import { Category, Meal } from "./interface";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Fetch categories from the API
async function getCategories(): Promise<Category[]> {
    const res = await fetch("http://localhost:8000/api/categories");
  
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
  
    return res.json();
  }
  
  // Fetch all meals from the API
  async function getMeals(): Promise<Meal[]> {
    const res = await fetch("http://localhost:8000/api/meals/");
  
    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }
  
    return res.json();
  }
  
  export default async function CategoriesPage() {
    const categories = await getCategories();
    const meals = await getMeals();
  
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Categories</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore our wide range of meal categories and discover delicious recipes.
          </p>
  
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category) => {
              // Filter meals by category
              const categoryMeals = meals.filter((meal) => meal.category === category.id);
  
              return (
                <AccordionItem key={category.id} value={`category-${category.id}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {category.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryMeals.map((meal) => (
                        <div key={meal.id} className="border rounded-lg overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={meal.image}
                              alt={meal.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
                            <Button asChild>
                              <Link href={`/recipes/${meal.meal_id}`}>View Recipe</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </main>
    );
  }