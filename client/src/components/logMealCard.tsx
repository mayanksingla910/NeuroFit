import { EllipsisVertical, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type loggedMeal = {
  id: number;
  name: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  description?: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  time: string;
}[];

const LogMealCard = () => {
  const [loggedMeals, setLoggedMeals] = useState<loggedMeal>([
    {
      id: 1,
      name: "Breakfast",
      description: "Oatmeal with fruits",
      calories: 1550,
      carbs: 120,
      protein: 127,
      fat: 67,
      time: "2023-11-07 10:00:00",
    },
    {
      id: 2,
      name: "Snack",
      description: "Oatmeal with fruits",
      calories: 1550,
      carbs: 120,
      protein: 127,
      fat: 67,
      time: "2023-11-07 10:00:00",
    },
  ]);

  return (
    <div className="flex flex-col justify-between items-center gap-4 p-6 bg-neutral-800/70 border border-neutral-700/60 shadow-md backdrop-blur-md transition-all rounded-xl">
      <div className="flex justify-between w-full items-end">
        <h1 className="text-green-500 font-bold text-xl">Today's Meals</h1>
        <Button className="text-neutral-200 bg-green-600 hover:bg-green-600/80 items-center justify-center flex gap-1 md:mr-10">
          {" "}
          <Plus /> Log Meal
        </Button>
      </div>
      <div className=" h-px w-full bg-neutral-600/70 " />
      <div className="gap-4 w-full">
        {loggedMeals.map((meal) => (
          <div
            key={meal.id}
            className="w-full flex justify-between gap-2 items-center rounded-md p-3 group hover:bg-neutral-700/50 "
          >
            <div className="w-full">
              <div className="text-green-500 font-semibold gap-1 text-base sm:text-lg flex justify-between">
                <h2 className="">{meal.name}</h2>
                <p className="">{meal.calories} Kcal</p>
              </div>
              <div className="flex justify-between gap-3 break-all text-neutral-300 text-xs sm:text-sm ">
                <p>{meal.description}</p>
                <p className="">
                  {meal.carbs}g Carbs | {meal.protein}g Protein | {meal.fat}g Fat
                </p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <div className="hidden md:block invisible group-hover:visible p-2 rounded-full hover:bg-neutral-600 active:bg-neutral-600/80">
                  <EllipsisVertical className="size-5 " />
                </div>
              </PopoverTrigger>

              <PopoverContent
                sideOffset={8}
                className="backdrop-blur-xl w-max p-1.5 flex flex-col rounded-md border border-neutral-700/80 bg-neutral-800/90"
              >
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <p className="cursor-pointer items-center flex px-4 py-1 rounded-sm text-sm text-neutral-200 hover:text-white hover:bg-neutral-700/60 active:bg-neutral-700/80">
                        <Pencil className="size-3.5 mr-2 " />
                        Modify
                      </p>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="flex flex-col gap-2 w-full">
                        <DialogTitle>Modify Meal</DialogTitle>
                        <DialogDescription>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Praesent eget risus sollicitudin, ullamcorper
                          justo eu, auctor ligula. Sed posuere, ante vel aliquet
                          lobortis, purus velit imperdiet mauris, in porttitor
                          sapien erat at eros. Donec vitae suscipit est. Sed
                          posuere, ante vel aliquet lobortis, purus velit
                          imperdiet mauris, in porttitor sapien erat at eros.
                          Donec vitae suscipit est.
                        </DialogDescription>
                        <div className="flex justify-end gap-2">
                          <Button className="text-neutral-200 bg-green-600 hover:bg-green-600/80 items-center justify-center flex gap-1 md:mr-10">
                            Save
                          </Button>
                          <Button className="text-neutral-200 bg-red-600 hover:bg-red-600/80 items-center justify-center flex gap-1 md:mr-10">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <p className="cursor-pointer items-center flex px-4 py-1 rounded-sm text-sm text-neutral-200 hover:text-white hover:bg-neutral-700/60 active:bg-neutral-700/80">
                    <Trash className="size-3.5  mr-2 " />
                    Delete
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogMealCard;
