import ExerciseCard from "@/components/exerciseCard";
import LogWorkoutCard from "@/components/logWorkoutCard";
import WorkoutPlanCard from "@/components/workoutPlanCard";
import { createFileRoute } from "@tanstack/react-router";
import { workoutPlan } from "@/assets/WorkoutPlan";
import type { LoggedWorkout } from "@/types/workout";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export const Route = createFileRoute("/_authenticated/exercise")({
  component: RouteComponent,
});

function RouteComponent() {
  const [loggedWorkouts, setLoggedWorkouts] = useState<LoggedWorkout[]>([]);


  useEffect(() => {
    const fetchLoggedWorkouts = async () => {
      try {
        const res = await api.get("/logWorkout");
        if (res.data.success) {
          setLoggedWorkouts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching logged workouts:", error);
      }
    };

    fetchLoggedWorkouts();
  }, []);

 

  return (
    <div className="space-y-6 transition-all duration-300">
      <ExerciseCard loggedWorkouts = {loggedWorkouts} />
      <LogWorkoutCard
        loggedWorkouts={loggedWorkouts}
        setLoggedWorkouts={setLoggedWorkouts}
      />
      <WorkoutPlanCard
        workoutPlan={workoutPlan}
        setLoggedWorkouts={setLoggedWorkouts}
      />
    </div>
  );
}
