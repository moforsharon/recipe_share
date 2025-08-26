export interface RecipeDetails {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    area: string;
    prep_time: number;
    cook_time: number;
    servings: number;
    ingredients: string[];
    instructions: string[];
    video: string;
    tags: string[];
  }