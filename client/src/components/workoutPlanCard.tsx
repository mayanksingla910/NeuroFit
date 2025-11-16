import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LoggedWorkout, WorkoutPlan } from "@/types/workout";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import WorkoutDetailsDialog from "./workoutDetailsDialog";
import api from "@/lib/api";

const day = new Date().getDay();

type LoggedWorkoutInput = Omit<LoggedWorkout, "id">;

const WorkoutPlanCard = ({
  workoutPlan,
  setLoggedWorkouts,
}: {
  workoutPlan: WorkoutPlan[];
  setLoggedWorkouts: React.Dispatch<React.SetStateAction<LoggedWorkout[]>>;
}) => {
  const [selectedDay, setSelectedDay] = useState(day);
  const [direction, setDirection] = useState(1);

  const dayPlan = workoutPlan[selectedDay];

  const variants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 20 : -20,
    }),
    animate: { opacity: 1, x: 0 },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 20 : -20,
    }),
  };

  const handlePrevDay = () => {
    setSelectedDay((prev) => (prev === 0 ? workoutPlan.length - 1 : prev - 1));
  };

  const handleNextDay = () => {
    setSelectedDay((prev) => (prev === workoutPlan.length - 1 ? 0 : prev + 1));
  };

  const handleLogWorkout = async (
    e: React.MouseEvent,
    workout: LoggedWorkoutInput,
  ) => {
    e.stopPropagation();
    try {
      const res = await api.post(`/logWorkout`, workout);
      if (res.data.success) {
        setLoggedWorkouts((prev) => [res.data.data, ...prev]);
      }
    } catch (error) {
      console.error("Error logging workout:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-6  transition-transform  rounded-xl">
      <div className="w-full flex justify-between items-center mb-2">
        <h2 className="text-xl text-green-500 font-bold ml-1">Workouts</h2>
        <div className="flex items-center mr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setDirection(-1);
              handlePrevDay();
            }}
            className="hover:text-green-500 text-neutral-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <span className="text-neutral-200 text-sm min-w-20 text-center">
            {dayPlan.day}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setDirection(1);
              handleNextDay();
            }}
            className="hover:text-green-500 text-neutral-400"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="h-px w-full bg-neutral-700/70" />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={selectedDay}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className=" w-full flex flex-col"
          layout
        >
          <div className="font-semibold text-sm ml-auto mr-5 my-2">
            <p>{dayPlan.focus}</p>
          </div>
          <div className="flex flex-wrap md:gap-4 ">
            {dayPlan.exercises.map((exercise,i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <div
                    className="relative group flex flex-col gap-2 p-3 text-NEUTRAL-200 hover:bg-neutral-700/40 rounded-md w-[50%] md:w-[30%] lg:w-[22%] xl:w-[24%] hover:scale-105 transition-transform duration-300"
                  >
                    <div className="rounded-md">
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="rounded-md aspect-video object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-sm sm:text-base text-green-500">
                      {exercise.name}
                    </h3>
                    {exercise.sets !== 0 && (
                      <h3 className="flex text-xs items-center font-medium text-neutral-300">
                        Sets: {exercise.sets}
                      </h3>
                    )}
                    {exercise.reps && (
                      <h3 className="flex text-xs items-center font-medium text-neutral-300">
                        Reps: {exercise.reps}
                      </h3>
                    )}
                    {exercise.time && (
                      <h3 className="flex text-xs items-center font-medium text-neutral-300">
                        Time: {exercise.time}
                      </h3>
                    )}
                    <Button
                      variant="outline"
                      onClick={(e) => handleLogWorkout(e, exercise)}
                      className="absolute bottom-3 right-3 bg-inherit flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Plus />
                      Log
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="flex flex-col gap-4 p-4 md:min-w-2xl bg-neutral-900">
                  <WorkoutDetailsDialog exercise={exercise} />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WorkoutPlanCard;
