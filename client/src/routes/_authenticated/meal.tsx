import LogMealCard from "@/components/logMealCard";
import MealCard from "@/components/mealCard";
import MealPlanCard from "@/components/mealPlanCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/meal")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <main className={`space-y-6 transition-filter duration-300`}>
        <MealCard />
        <LogMealCard />
        <MealPlanCard />
      </main>
    </div>
  );
}
