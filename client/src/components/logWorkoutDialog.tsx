import type { LoggedWorkout } from "@/types/workout";
import WorkoutComboBox from "./workoutComboBox";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DialogClose, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface LogWorkoutDialogProps {
  onSubmit: (workout: LoggedWorkout) => void;
  initialWorkout?: LoggedWorkout;
}

const defaultWorkout: LoggedWorkout = {
  name: "",
  image: "",
  sets: 1,
  reps: "",
  time: "",
};

const LogWorkoutDialog = ({onSubmit, initialWorkout}: LogWorkoutDialogProps) => {
  const [workout, setWorkout] = useState<LoggedWorkout>(initialWorkout || defaultWorkout);

  const handleIncrement = () => {
    if (workout.sets === 100) return;
    setWorkout((prev) => ({
      ...prev,
      sets: prev.sets + 1,
    }));
  };

  const handleDecrement = () => {
    if (workout.sets === 1) return;
    setWorkout((prev) => ({
      ...prev,
      sets: prev.sets - 1,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(workout);
    setWorkout(defaultWorkout);
  };


  return (
    <div className="space-y-4">
      <DialogTitle className="font-bold text-green-500 text-xl">{initialWorkout ? "Edit Workout" : "Log Workout"}</DialogTitle>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="mb-2">Workout</Label>
          <WorkoutComboBox workout={workout} setWorkout={setWorkout} />
        </div>
        <div className="flex flex-wrap">
          <div className="space-y-3 w-1/2">
            <Label>Sets</Label>
            <div className="relative">
              <Input
                id="sets"
                type="number"
                value={workout.sets || ""}
                onChange={(e) =>
                  setWorkout((prev) => ({
                    ...prev,
                    sets: Number(e.target.value),
                  }))
                }
                min={1}
                max={100}
                className="w-full px-3 appearance-none text-center disabled:cursor-default disabled:opacity-80 rounded-r-none"
              />
              <div className="absolute right-2 top-0.5 flex flex-col">
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                  <ChevronDown className="size-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-3 w-1/2">
            <Label>Reps (e.g. 10-12)</Label>
            <Input
              placeholder="10-12"
              value={workout.reps || ""}
              onChange={(e) =>
                setWorkout((prev) => ({ ...prev, reps: e.target.value }))
              }
              className="rounded-l-none"
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label>Time</Label>
          <Input
            placeholder="10-12"
            value={workout.time || ""}
            onChange={(e) =>
              setWorkout((prev) => ({ ...prev, time: e.target.value }))
            }
            className=""
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className="text-neutral-200 bg-green-600 hover:bg-green-600/80"
            >
              {initialWorkout ? "Save Changes" : "Add Workout"}
            </Button>
          </DialogClose>
        </div>
      </form>
    </div>
  );
};

export default LogWorkoutDialog;
