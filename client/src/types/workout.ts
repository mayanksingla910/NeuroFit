export interface Workout {
  id: string;
  name: string;
  description: string;
  image: string;
  sets: number;
  reps?: string | null;
  time?: string | null;
}


export interface WorkoutPlan {
  day: string;
  focus: string;
  exercises: Workout[];
}

export interface LoggedWorkout {
  id?: number;
  name: string;
  image: string;
  sets: number;
  reps?: string | null;
  time?: string | null;
}