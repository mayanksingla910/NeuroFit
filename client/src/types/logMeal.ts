export type LoggedMeal = {
  id?: number;
  name: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  description: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

export type Nutrition = {
  Calories: number;
  Protein: number;
  Carbs: number;  
  Fat: number;
}