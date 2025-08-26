import Link from "next/link"
import Image from "next/image"
import { Clock, Users, ChefHat } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

export function FeaturedRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <div className="rounded-xl overflow-hidden border bg-card text-card-foreground shadow">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-full">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-4 left-4">{recipe.category_name}</Badge>
        </div>
        <div className="p-6 flex flex-col">
          <h3 className="text-2xl font-bold mb-2">{recipe.name}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{recipe.description}</p>

          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
              <Clock className="h-5 w-5 mb-1" />
              <span className="text-xs">Prep</span>
              <span className="font-medium">{recipe.prep_time}m</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
              <ChefHat className="h-5 w-5 mb-1" />
              <span className="text-xs">Cook</span>
              <span className="font-medium">{recipe.cook_time}m</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
              <Users className="h-5 w-5 mb-1" />
              <span className="text-xs">Serves</span>
              <span className="font-medium">{recipe.servings}</span>
            </div>
          </div>

          {/* <div className="flex items-center gap-3 mb-4">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={recipe.author.image || "/placeholder.svg?height=32&width=32"}
                alt={recipe.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm">By {recipe.author.name}</span>
          </div> */}

          <Button asChild className="w-full">
            <Link href={`/recipes/${recipe.meal_id}`}>View Full Recipe</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

