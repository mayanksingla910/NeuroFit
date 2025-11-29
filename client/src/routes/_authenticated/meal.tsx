import LogMealCard from "@/components/logMealCard";
import MealCard from "@/components/mealCard";
import MealPlanCard from "@/components/mealPlanCard";
import api from "@/lib/api";
import type { Nutrition, LoggedMeal } from "@/types/logMeal";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/meal")({
  component: RouteComponent,
});

function RouteComponent() {
  
  const [nutrition, setNutrition] = useState<Nutrition>({
    Calories: 1550,
    Protein: 127,
    Carbs: 120,
    Fat: 67,
  });

  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);

  useEffect(() => {
    const fetchLoggedMeals = async () => {
      try {
        const response = await api.get(`/getLoggedMeals`);
        setLoggedMeals(response.data || []);
      } catch (error) {
        console.error("Error fetching logged meals:", error);
      }
    };

    fetchLoggedMeals();
  }, []);


  useEffect(() => {
    // Calculate nutrition totals
    const totalNutrition = loggedMeals.reduce(
      (acc, meal) => ({
        Calories: acc.Calories + meal.calories,
        Protein: acc.Protein + meal.protein,
        Carbs: acc.Carbs + meal.carbs,
        Fat: acc.Fat + meal.fat,
      }),
      { Calories: 0, Protein: 0, Carbs: 0, Fat: 0 }
    );

    setNutrition(totalNutrition);
  }, [loggedMeals]);

  return (
    <div>
      <main className={`space-y-6 transition-all duration-300`}>
        <MealCard nutrition={nutrition} />
        <LogMealCard
          loggedMeals={loggedMeals}
          setLoggedMeals={setLoggedMeals}
        />
        <MealPlanCard />
      </main>
    </div>
  );
}
