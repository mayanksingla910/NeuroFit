import { ChevronLeft, ChevronRight, Flame, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

import { motion, AnimatePresence } from "framer-motion";
import type { LoggedMeal } from "@/types/logMeal";
import api from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";

// Mock meal plan data for the week
const MEAL = {
  calorieGoal: "2,500 kcal/day", 
  weeklyPlan: [
    {
        day: "Sunday",
        meals: [
          { name: "Breakfast", description: "Scrambled Eggs (3), Spinach, & Whole Grain Tortilla", calories: 490, protein: 30, carbs: 45, fat: 20 },
          { name: "Snack", description: "Orange", calories: 70, protein: 1, carbs: 15, fat: 0 },
          { name: "Lunch", description: "Leftover Steak & Veggies from Saturday", calories: 650, protein: 50, carbs: 35, fat: 35 },
          { name: "Snack", description: "Edamame Pods", calories: 180, protein: 15, carbs: 15, fat: 5 },
          { name: "Dinner", description: "Large Turkey Chili Bowl with Avocado", calories: 780, protein: 65, carbs: 70, fat: 25 }
        ],
        dailyTotal: "2170 kcal"
    },
    {
            day: "Monday",
            meals: [
              { name: "Breakfast", description: "Greek Yogurt, Mixed Berries, & Nuts", calories: 420, protein: 25, carbs: 45, fat: 18 },
              { name: "Snack", description: "Banana (Pre-Workout)", calories: 105, protein: 1, carbs: 27, fat: 0 },
              { name: "Lunch", description: "Grilled Chicken Salad w/ Balsamic", calories: 680, protein: 60, carbs: 35, fat: 35 },
              { name: "Snack", description: "Hummus & Carrot Sticks (Post-Workout)", calories: 150, protein: 5, carbs: 20, fat: 6 },
              { name: "Dinner", description: "Baked Salmon, Quinoa, & Steamed Broccoli", calories: 895, protein: 65, carbs: 70, fat: 40 }
            ],
            dailyTotal: "2250 kcal"
        },
        {
            day: "Tuesday",
            meals: [
              { name: "Breakfast", description: "Oatmeal with Sliced Apple & Cinnamon", calories: 480, protein: 15, carbs: 85, fat: 10 },
              { name: "Snack", description: "Handful of Almonds", calories: 180, protein: 6, carbs: 7, fat: 15 },
              { name: "Lunch", description: "Turkey Wrap (Whole Grain) with Veggies", calories: 590, protein: 45, carbs: 60, fat: 20 },
              { name: "Snack", description: "Cottage Cheese with Pineapple Chunks", calories: 160, protein: 20, carbs: 15, fat: 3 },
              { name: "Dinner", description: "Stir-fried Tofu with Brown Rice & Mixed Veggies", calories: 890, protein: 40, carbs: 90, fat: 40 }
            ],
            dailyTotal: "2300 kcal"
        },
        {
            day: "Wednesday",
            meals: [
              { name: "Breakfast", description: "Smoothie (Spinach, Banana, Protein, Almond Milk)", calories: 450, protein: 40, carbs: 45, fat: 10 },
              { name: "Snack", description: "Hard-boiled Eggs (2)", calories: 140, protein: 12, carbs: 1, fat: 10 },
              { name: "Lunch", description: "Quinoa Salad with Chickpeas & Lemon Vinaigrette", calories: 610, protein: 25, carbs: 80, fat: 25 },
              { name: "Snack", description: "Rice Cakes with Peanut Butter (2 tbsp)", calories: 190, protein: 8, carbs: 25, fat: 8 },
              { name: "Dinner", description: "Roast Chicken with Sweet Potatoes & Green Beans", calories: 950, protein: 75, carbs: 70, fat: 40 }
            ],
            dailyTotal: "2340 kcal"
        },
        {
            day: "Thursday",
            meals: [
              { name: "Breakfast", description: "Whole Grain Toast, Avocado, & Poached Egg", calories: 510, protein: 20, carbs: 40, fat: 30 },
              { name: "Snack", description: "Greek Yogurt, Honey, & Walnuts", calories: 220, protein: 18, carbs: 20, fat: 8 },
              { name: "Lunch", description: "Lentil Soup with Side Salad", calories: 600, protein: 30, carbs: 75, fat: 20 },
              { name: "Snack", description: "Sliced Cucumbers with Tzatziki", calories: 110, protein: 5, carbs: 10, fat: 5 },
              { name: "Dinner", description: "Grilled Shrimp Tacos with Cabbage Slaw", calories: 900, protein: 70, carbs: 80, fat: 35 }
            ],
            dailyTotal: "2340 kcal"
        },
        {
            day: "Friday",
            meals: [
              { name: "Breakfast", description: "Chia Seed Pudding (Almond Milk) with Fresh Fruit", calories: 430, protein: 15, carbs: 50, fat: 20 },
              { name: "Snack", description: "Protein Bar (20g protein)", calories: 240, protein: 20, carbs: 25, fat: 8 },
              { name: "Lunch", description: "Spinach & Feta Omelet with Whole Grain Toast", calories: 620, protein: 45, carbs: 40, fat: 30 },
              { name: "Snack", description: "Apple with Almond Butter", calories: 210, protein: 5, carbs: 30, fat: 10 },
              { name: "Dinner", description: "Ground Turkey Stuffed Peppers", calories: 850, protein: 60, carbs: 85, fat: 30 }
            ],
            dailyTotal: "2350 kcal"
        },
        {
            day: "Saturday",
            meals: [
              { name: "Breakfast", description: "Whole Grain Pancakes with Maple Syrup & Eggs", calories: 580, protein: 30, carbs: 70, fat: 20 },
              { name: "Snack", description: "Mixed Nuts & Seeds", calories: 250, protein: 8, carbs: 15, fat: 18 },
              { name: "Lunch", description: "Large Tuna Salad Sandwich on Whole Wheat", calories: 750, protein: 55, carbs: 60, fat: 35 },
              { name: "Snack", description: "Protein Shake", calories: 200, protein: 30, carbs: 10, fat: 5 },
              { name: "Dinner", description: "Lean Steak with Roasted Potatoes & Sautéed Greens", calories: 970, protein: 80, carbs: 90, fat: 35 }
            ],
            dailyTotal: "2750 kcal"
        },
    ]
};

const day = new Date().getDay();

const MealPlanCard = ({setLoggedMeals}: {setLoggedMeals: React.Dispatch<React.SetStateAction<LoggedMeal[]>>}) => {
  const [selectedDay, setSelectedDay] = useState(day);
  const [direction, setDirection] = useState(1);

  const dayPlan = MEAL.weeklyPlan[selectedDay];

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
    setSelectedDay((prev) =>
      prev === 0 ? MEAL.weeklyPlan.length - 1 : prev - 1
    );
  };

  const handleNextDay = () => {
    setSelectedDay((prev) =>
      prev === MEAL.weeklyPlan.length - 1 ? 0 : prev + 1
    );
  };

  const handleLogMeal = async (e: React.MouseEvent, meal: LoggedMeal) => {
    e.stopPropagation();
    try {
      const res = await api.post(`/logMeal`, meal);
      if (res.data.success) {
        setLoggedMeals((prev) => [res.data.data, ...prev]);
        toast.success(res.data.message);
      }
    } catch (error) {
      if(isAxiosError(error)){
        toast.error(error.response?.data.message);
        return;
      }
      toast.error("Error logging meal");
    }
  };

  return (
    <div className="flex flex-col justify-between items-center gap-4 p-4 sm:p-6 bg-neutral-800/70  border-neutral-700/60 shadow-md backdrop-blur-md transition-all rounded-xl">
      <div className="w-full flex justify-between items-center mb-2">
        <h2 className="text-xl text-green-500 font-bold ml-1">Meals</h2>
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
      <div className="border-neutral-700/70 border rounded-lg w-full">
        <div className="mx-3 my-2 flex justify-evenly p-2 text-neutral-200 bg-neutral-700/70 rounded-lg">
          <h3 className="flex items-center gap-1">
            <Flame className="size-4 text-green-500" />
            Daily Target
          </h3>
          <h3 className="text-green-600 font-semibold">{MEAL.calorieGoal}</h3>
        </div>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selectedDay}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="m-2"
            layout
          >
            {dayPlan.meals.map((meal, index) => (
              <>
                <div
                  key={index}
                  className="w-full rounded-md hover:bg-neutral-700/40 p-3 group relative"
                >
                  <div className="">
                    <div className="flex flex-row gap-2 sm:text-lg  text-green-500 font-medium justify-between">
                      <h3 className="">{meal.name}</h3>
                      <h3 className="group-hover:opacity-0 transition-opacity">{meal.calories} kcal</h3>
                    </div>
                    <div className="flex flex-row gap-2 text-xs sm:text-sm text-neutral-400 font-medium justify-between">
                      <h3 >{meal.description}</h3>
                      <h3 className="group-hover:opacity-0 transition-opacity">{meal.carbs}g Carbs | {meal.protein}g Protein | {meal.fat}g</h3>
                    </div>
                    <Button
                      variant="outline"
                      onClick={(e) => handleLogMeal(e, meal as LoggedMeal)}
                      className="absolute top-5 right-4 bg-inherit flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Plus />
                      Log
                    </Button>
                  </div>
                </div>
              </>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MealPlanCard;
