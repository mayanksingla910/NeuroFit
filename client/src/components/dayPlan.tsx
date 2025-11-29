import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ChevronRight, Flame, Soup, Timer } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

const WORKOUT = {
  day: "Wednesday",
  duration: "60 minutes",
  intensity: "Low",
  focus: "Full Body",
  workoutDetails: [
    {
      section: "Warm-Up",
      items: [
        "Side Lunges: 1 min",
        "Arm Circles: 30 sec",
        "High Knees: 3.5 min",
      ],
    },
    {
      section: "Main Circuit (2 Rounds)",
      circuitInfo: "45s exercise / 30s rest",
      items: [
        "Leg Press",
        "Chest Press Machine",
        "Dumbbell Deadlifts",
        "Lateral Raises",
        "Plank Hold",
      ],
    },
    {
      section: "Cool-Down",
      items: [
        "Arm Across Chest Stretch: 30 sec",
        "Standing Hamstring Stretch: 30 sec",
        "Child’s Pose: 1 min",
      ],
    },
  ],
};

const MEAL = {
  day: "Wednesday",
  calorieGoal: "2,500 kcal",
  meals: [
    {
      name: "Breakfast",
      summary: "Oatmeal with Berries & Almonds",
      calories: 450,
      macros: "P: 20g, C: 60g, F: 15g",
    },
    {
      name: "Lunch",
      summary: "Grilled Chicken Salad with Vinaigrette",
      calories: 650,
      macros: "P: 50g, C: 30g, F: 40g",
    },
    {
      name: "Dinner",
      summary: "Baked Salmon with Quinoa & Asparagus",
      calories: 900,
      macros: "P: 65g, C: 55g, F: 45g",
    },
    {
      name: "Snack",
      summary: "Greek Yogurt & Honey",
      calories: 200,
      macros: "P: 15g, C: 20g, F: 5g",
    },
  ],
};

export default function DayPlan() {
  const navigate = useNavigate();

  return (
    <div className="flex lg:flex-row flex-col gap-4 w-full ">
      <div className="p-3 w-full lg:w-1/2 rounded-lg border bg-neutral-800/60 backdrop-blur-sm border-neutral-700/60 hover:shadow-[0_2px_10px_rgb(0,0,0,0.1)] shadow-amber-50/15 transition-shadow duration-300  group">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl flex items-center gap-2 text-green-500 font-bold ml-1">
            <FontAwesomeIcon icon={faDumbbell} className="text-base rotate-45"/>
            Exercises</h2>
          <Button
            onClick={() => navigate({ to: "/tracker" })}
            variant="link"
            className="text-xs text-neutral-300 group-hover:opacity-100 opacity-0 transition-all duration-200"
          >
            Start Tracking →
          </Button>
        </div>
        <div className="border-neutral-700/70 border rounded-lg" >
          <div className="mx-3 my-2 flex justify-evenly p-2 text-gray-200 bg-neutral-700/70  rounded-lg">
            <h3 className="flex items-center gap-1">
              <Timer className="size-4 text-green-500" />
              {WORKOUT.duration}
            </h3>
            <h3>Focus: {WORKOUT.focus}</h3>
          </div>
          <div className="m-2">
            {WORKOUT.workoutDetails.map(({ section, items }, index) => (
              <>
              <div key={index} className="flex flex-col gap-2 p-3 text-NEUTRAL-200 hover:bg-neutral-700/40 rounded-md">
                <h3 className="font-medium">{section}</h3>
                <div className="flex flex-col gap-2 text-neutral-200 font-medium">
                  {items.map((item, index) => (
                    <h3 key={index} className="flex text-xs items-center text-neutral-300">
                      <ChevronRight className="size-3 stroke-neutral-300" />
                      {item}
                    </h3>
                  ))}
                </div>
              </div>
              {!(WORKOUT.workoutDetails.length - 1 === index) && (
                  <div className="border border-neutral-600/60 w-[97%] my-2 rounded-full mx-auto" />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3 w-full lg:w-1/2 rounded-lg border bg-neutral-800/60 backdrop-blur-sm border-neutral-700/60 hover:shadow-[0_2px_10px_rgb(0,0,0,0.1)] shadow-amber-50/15 transition-shadow duration-300  group">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl flex items-center gap-2 text-green-500 font-bold ml-1">
            <Soup className="size-5"/>
            Meals</h2>
          <Button
            onClick={() => navigate({ to: "/meal" })}
            variant="link"
            className="text-xs text-neutral-300 group-hover:opacity-100 opacity-0 transition-all duration-200"
          >
            Start Tracking →
          </Button>
        </div>
        <div className="border-neutral-700/70 border rounded-lg">
          <div className="mx-3 my-2 flex justify-evenly p-2 text-neutral-200 bg-neutral-700/70 rounded-lg">
            <h3 className="flex items-center gap-1">
              <Flame className="size-4 text-green-500" />
              Daily Target
            </h3>
            <h3 className="text-green-600 font-semibold">{MEAL.calorieGoal}</h3>
          </div>
          <div className="m-2">
            {MEAL.meals.map((meal, index) => (
              <>
                <div key={index} className="w-full rounded-md hover:bg-neutral-700/40 p-3">
                  <div className="">
                    <div className="flex flex-row gap-2 text-neutral-200 font-medium justify-between">
                      <h3 className="">{meal.name}</h3>
                      <h3 className="text-green-500">{meal.calories} kcal</h3>
                    </div>
                    <div className="flex flex-row gap-2 text-xs text-neutral-400 font-medium justify-between">
                      <h3 className="">{meal.summary}</h3>
                      <h3>{meal.macros}</h3>
                    </div>
                  </div>
                </div>
                {!(MEAL.meals.length - 1 === index) && (
                  <div className="border border-neutral-600/60 w-[97%] my-2 rounded-full mx-auto" />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
