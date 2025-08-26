export interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
  }
  
  export interface Meal {
    id: number;
    name: string;
    image: string;
    category: number; // Category ID
    meal_id: string;
  }