import { EllipsisVertical, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import LogWorkoutDialog from "./logWorkoutDialog";
import type { LoggedWorkout } from "@/types/workout";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import api from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const LogWorkoutCard = ({
  loggedWorkouts,
  setLoggedWorkouts,
}: {
  loggedWorkouts: LoggedWorkout[];
  setLoggedWorkouts: React.Dispatch<React.SetStateAction<LoggedWorkout[]>>;
}) => {
  const handleLogWorkout = async (workout: LoggedWorkout) => {
    try {
      const res = await api.post(`/logWorkout`, workout);
      if (res.data.success) {
        setLoggedWorkouts((prev) => [res.data.data, ...prev]);
        toast.success(res.data.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error("Error logging workout");
    }
  };

  const handleUpdateWorkout = async (workout: LoggedWorkout) => {
    try {
      const res = await api.put(`/logWorkout/${workout.id}`, workout);
      if (res.data.success) {
        setLoggedWorkouts((prev) =>
          prev.map((w) => (w.id === workout.id ? res.data.data : w))
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error("Error logging workout");
    }
  };

  const handleDelete = (id: number) => {
    const originalIndex = loggedWorkouts.findIndex((w) => w.id === id);
    const workoutToDelete = loggedWorkouts[originalIndex];
    if (!workoutToDelete) return;

    setLoggedWorkouts((prev) => prev.filter((w) => w.id !== id));

    let isUndoClicked = false;

    toast.success("Workout deleted", {
      duration: 7000,
      action: {
        label: "Undo",
        onClick: () => {
          isUndoClicked = true;

          setLoggedWorkouts((prev) => {
            const newWorkouts = [...prev];
            newWorkouts.splice(originalIndex, 0, workoutToDelete);
            return newWorkouts;
          });
        },
      },
      onDismiss: () => {
        if (!isUndoClicked) {
          api.delete(`/logWorkout/${id}`).catch((error) => {
            if (isAxiosError(error)) {
              toast.error(error.response?.data.message);
              return;
            }
            toast.error("Failed to delete from server");
          });
        }
      },
    });
  };
  return (
    <div className="flex flex-col gap-4 p-6 bg-neutral-800/70 hover:shadow-[0_2px_10px_rgb(0,0,0,0.1)] shadow-amber-50/20 transition-shadow duration-300 backdrop-blur-md rounded-xl">
      <div className="flex justify-between items-end">
        <h1 className="text-green-500 font-bold text-xl">Today's Workouts</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-600/80 text-white flex items-center ml-auto gap-1">
              <Plus className="size-4" /> Log Workout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <LogWorkoutDialog onSubmit={handleLogWorkout} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="h-px w-full bg-neutral-700/70" />
      <div>
        {loggedWorkouts.length === 0 ? (
          <p className="text-neutral-400 text-sm text-center italic">
            No Workouts logged yet.
          </p>
        ) : (
          <div>
            {loggedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex justify-between items-center p-3 rounded-md hover:bg-neutral-700/40 group transition-colors"
              >
                <div className="w-full flex gap-4">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="aspect-video object-cover w-32 rounded-md"
                  />

                  <div className="mt-1">
                    <h2 className="text-green-500 font-semibold text-lg">
                      {workout.name}
                    </h2>
                    <p>
                      {workout.sets && `Sets: ${workout.sets}`}
                      {workout.reps && ` | Reps: ${workout.reps}`}
                      {workout.time && ` | Time: ${workout.time}`}
                    </p>
                    <p></p>
                  </div>
                  <div className="flex justify-between text-neutral-300 text-sm"></div>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className="hidden md:block invisible group-hover:visible p-2 ml-2 rounded-full hover:bg-neutral-600">
                      <EllipsisVertical className="size-5 text-neutral-300" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    sideOffset={8}
                    className="w-max p-1.5 flex flex-col rounded-md border border-neutral-700/80 bg-neutral-800/90 backdrop-blur-md"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="cursor-pointer flex items-center px-4 py-1 rounded-sm text-sm text-neutral-200 hover:bg-neutral-700/60 w-full text-left">
                          <Pencil className="size-3.5 mr-2" /> Modify
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <LogWorkoutDialog
                          initialWorkout={workout}
                          onSubmit={handleUpdateWorkout}
                        />
                      </DialogContent>
                    </Dialog>
                    <button
                      onClick={() => handleDelete(workout.id!)}
                      className="cursor-pointer flex items-center px-4 py-1 rounded-sm text-sm text-neutral-200 hover:bg-neutral-700/60 w-full text-left"
                    >
                      <Trash className="size-3.5 mr-2" /> Delete
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogWorkoutCard;
