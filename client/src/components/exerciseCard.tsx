import type { LoggedWorkout } from "@/types/workout";
import { faDumbbell, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const now = new Date();
const formatted = now.toLocaleString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

const ExerciseCard = ({loggedWorkouts}: {loggedWorkouts: LoggedWorkout[]}) => {
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    setTotalWorkouts(loggedWorkouts.length);

    setTotalCalories(
  loggedWorkouts.reduce(
    (acc) => acc + (Math.floor(Math.random() * 51) + 50),
    0
  )
);
  }, [loggedWorkouts]);

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8 p-6 bg-neutral-800/70 border hover:shadow-[0_2px_8px_rgb(0,0,0.1)] backdrop-blur-md shadow-amber-50/20 hover:-translate-y-1 transition-all duration-300 rounded-xl">
      <div>
        <h1 className="font-bold text-2xl text-neutral-100">Daily Total</h1>
        <p className="text-green-600/90 font-semibold">{formatted}</p>
      </div>
      <div className="flex sm:flex-row flex-col gap-6 sm:w-full lg:w-1/2 2xl:w-1/3 ">
        <div className="hidden lg:block h-28 w-px rounded-lg bg-neutral-700/70" />
        <div className="flex flex-col w-full justify-center">
          <h2 className="text-lg flex text-gray-100 items-center">
            <FontAwesomeIcon
              icon={faDumbbell}
              className="mr-2 text-base rotate-45 text-green-600"
            />
            Workouts
          </h2>
          <p className="text-3xl font-bold  text-green-500 mt-2">
            {totalWorkouts}
          </p>
          <p className="text-neutral-400 text-sm mt-1">Keep it going!</p>
        </div>

        <div className=" sm:h-28 h-px sm:w-px w-full rounded-lg bg-neutral-700/70" />

        <div className="flex flex-col w-full justify-center">
          <h2 className="text-lg text-gray-100 items-center">
            <FontAwesomeIcon
              icon={faFire}
              className="mr-2 text-base text-green-600"
            />
            Calories Burned
          </h2>
          <p className="text-3xl font-bold text-green-500 mt-2">{totalCalories}</p>
          <p className="text-neutral-400 text-sm mt-1">Good Work!</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
