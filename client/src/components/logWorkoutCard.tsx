import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import LogWorkoutDialog from "./logWorkoutDialog";
import { useState } from "react";

const LogWorkoutCard = () => {

    const [loggedWorkouts, setLoggedWorkouts] = useState([]);

  return (
    <div className="flex flex-col gap-4 p-6 bg-neutral-800/70 border border-neutral-700/60 shadow-md backdrop-blur-md rounded-xl">
      <div className="flex justify-between items-end">
        <h1 className="text-green-500 font-bold text-xl">Today's Workouts</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-600/80 text-white flex items-center ml-auto gap-1">
              <Plus className="size-4" /> Log Workout
            </Button>
          </DialogTrigger>
          <LogWorkoutDialog />
        </Dialog>
      </div>

      <div className="h-px w-full bg-neutral-700/70" />
      <div>
        <p className="text-neutral-400 text-sm text-center italic">
            No Workouts logged yet.
          </p>
      </div>
    </div>
  );
};

export default LogWorkoutCard;
