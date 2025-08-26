import Link from "next/link"
import Image from "next/image"
import { Clock, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Recipe {
  id: string
  name: string
  image: string
  prep_time: number
  servings: number
  category: string
  category_name: string
  meal_id: string
  author: {
    name: string
  }
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image || "/placeholder.svg?height=192&width=384"}
            alt={recipe.name}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-2 right-2">{recipe.category_name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/recipes/${recipe.id}`}>
          <h3 className="text-lg font-semibold hover:text-primary transition-colors mb-2">{recipe.name}</h3>
        </Link>
        {/* <p className="text-sm text-muted-foreground mb-2">By {recipe.author.name}</p> */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.prep_time} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link href={`/recipes/${recipe.meal_id}`} className="text-sm font-medium text-primary hover:underline">
          View Recipe
        </Link>
      </CardFooter>
    </Card>
  )
}

