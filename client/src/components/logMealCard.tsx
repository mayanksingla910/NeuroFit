import { EllipsisVertical, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog, DialogTrigger } from "./ui/dialog";
import LogMealDialog from "./logMealDialog";
import type { LoggedMeal } from "@/types/logMeal";
import api from "@/lib/api";

const LogMealCard = ({loggedMeals, setLoggedMeals}: {loggedMeals: LoggedMeal[], setLoggedMeals: React.Dispatch<React.SetStateAction<LoggedMeal[]>>}) => {
  

  const handleLogMeal = async (meal: LoggedMeal) => {
    try{
      const res = await api.post(`/logMeal`, meal);
      setLoggedMeals((prev) => [res.data.data, ...prev]);
    }catch(error){ 
      console.error("Error logging meal:", error);
    }
  };

  const handleUpdateMeal = async (updatedMeal: LoggedMeal) => {
    try {
      await api.put(`/updateLoggedMeal/${updatedMeal.id}`, updatedMeal);
      setLoggedMeals((prev) => prev.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal)));
    } catch (error) {
      console.error("Error updating meal:", error);
    }
  };

  const handleDeleteMeal = async (id: number) => {
    await api.delete(`/deleteLoggedMeal/${id}`);
    setLoggedMeals((prev) => prev.filter((meal) => meal.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-neutral-800/70 hover:shadow-[0_2px_10px_rgb(0,0,0,0.1)] shadow-amber-50/20 transition-shadow duration-300 backdrop-blur-md rounded-xl">
      <div className="flex justify-between items-end">
        <h1 className="text-green-500 font-bold text-xl">Today's Meals</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-600/80 text-white flex items-center sm:mr-10 gap-1">
              <Plus className="size-4" /> Log Meal
            </Button>
          </DialogTrigger>
          <LogMealDialog onSubmit={handleLogMeal} />
        </Dialog>
      </div>

      <div className="h-px w-full bg-neutral-700/70" />

      <div className="flex flex-col gap-3 w-full">
        {loggedMeals.length === 0 ? (
          <p className="text-neutral-400 text-sm text-center italic">
            No meals logged yet.
          </p>
        ) : (
          loggedMeals.map((meal, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-3 rounded-md hover:bg-neutral-700/40 group transition-colors"
            >
              <div className="w-full">
                <div className="flex justify-between text-green-500 font-semibold">
                  <h2>{meal.name}</h2>
                  <p>{meal.calories} kcal</p>
                </div>
                <div className="flex justify-between text-neutral-300 text-sm">
                  <p>{meal.description}</p>
                  <p>
                    {meal.carbs}g Carbs | {meal.protein}g Protein | {meal.fat}g
                    Fat
                  </p>
                </div>
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
                    <LogMealDialog
                      initialMeal={meal}
                      onSubmit={handleUpdateMeal}
                    />
                  </Dialog>
                  <button
                    onClick={() => handleDeleteMeal(meal.id!)}
                    className="cursor-pointer flex items-center px-4 py-1 rounded-sm text-sm text-neutral-200 hover:bg-neutral-700/60 w-full text-left"
                  >
                    <Trash className="size-3.5 mr-2" /> Delete
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogMealCard;
