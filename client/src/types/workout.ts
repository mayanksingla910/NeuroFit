export interface Workout {
  id: string;
  name: string;
  description: string;
  image: string;
  sets: number;
  reps: string;
  time: string;
}

export interface WorkoutPlan {
  day: string;
  focus: string;
  exercises: Workout[];
}