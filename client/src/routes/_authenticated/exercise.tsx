import ExerciseCard from "@/components/exerciseCard";
import LogWorkoutCard from "@/components/logWorkoutCard";
import WorkoutPlanCard from "@/components/workoutPlanCard";
import { createFileRoute } from "@tanstack/react-router";
import { workoutPlan } from "@/assets/WorkoutPlan";

export const Route = createFileRoute("/_authenticated/exercise")({
  component: RouteComponent,
});

function RouteComponent() {

  


  return (
    <div className="space-y-6 transition-all duration-300">
      <ExerciseCard />
      <LogWorkoutCard />
      <WorkoutPlanCard workoutPlan={workoutPlan} />
    </div>
  );
}
