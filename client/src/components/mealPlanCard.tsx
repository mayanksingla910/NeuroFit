import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

import { motion, AnimatePresence } from "framer-motion";

// Mock meal plan data for the week
const MEAL = {
    calorieGoal: "2,500 kcal/day", 
    weeklyPlan: [
        {
            day: "Monday",
            meals: [
                { name: "Breakfast", summary: "Greek Yogurt, Mixed Berries, & Nuts", calories: 420, macros: "P: 25g, C: 45g, F: 18g" },
                { name: "Snack 1", summary: "Banana (Pre-Workout)", calories: 105, macros: "P: 1g, C: 27g, F: 0g" },
                { name: "Lunch", summary: "Grilled Chicken Salad w/ Balsamic", calories: 680, macros: "P: 60g, C: 35g, F: 35g" },
                { name: "Snack 2", summary: "Hummus & Carrot Sticks (Post-Workout)", calories: 150, macros: "P: 5g, C: 20g, F: 6g" },
                { name: "Dinner", summary: "Baked Salmon, Quinoa, & Steamed Broccoli", calories: 895, macros: "P: 65g, C: 70g, F: 40g" }
            ],
            dailyTotal: "2250 kcal"
        },
        {
            day: "Tuesday",
            meals: [
                { name: "Breakfast", summary: "Oatmeal with Sliced Apple & Cinnamon", calories: 480, macros: "P: 15g, C: 85g, F: 10g" },
                { name: "Snack 1", summary: "Handful of Almonds", calories: 180, macros: "P: 6g, C: 7g, F: 15g" },
                { name: "Lunch", summary: "Turkey Wrap (Whole Grain) with Veggies", calories: 590, macros: "P: 45g, C: 60g, F: 20g" },
                { name: "Snack 2", summary: "Cottage Cheese with Pineapple Chunks", calories: 160, macros: "P: 20g, C: 15g, F: 3g" },
                { name: "Dinner", summary: "Stir-fried Tofu with Brown Rice & Mixed Veggies", calories: 890, macros: "P: 40g, C: 90g, F: 40g" }
            ],
            dailyTotal: "2300 kcal"
        },
        {
            day: "Wednesday",
            meals: [
                { name: "Breakfast", summary: "Smoothie (Spinach, Banana, Protein, Almond Milk)", calories: 450, macros: "P: 40g, C: 45g, F: 10g" },
                { name: "Snack 1", summary: "Hard-boiled Eggs (2)", calories: 140, macros: "P: 12g, C: 1g, F: 10g" },
                { name: "Lunch", summary: "Quinoa Salad with Chickpeas & Lemon Vinaigrette", calories: 610, macros: "P: 25g, C: 80g, F: 25g" },
                { name: "Snack 2", summary: "Rice Cakes with Peanut Butter (2 tbsp)", calories: 190, macros: "P: 8g, C: 25g, F: 8g" },
                { name: "Dinner", summary: "Roast Chicken with Sweet Potatoes & Green Beans", calories: 950, macros: "P: 75g, C: 70g, F: 40g" }
            ],
            dailyTotal: "2340 kcal"
        },
        {
            day: "Thursday",
            meals: [
                { name: "Breakfast", summary: "Whole Grain Toast, Avocado, & Poached Egg", calories: 510, macros: "P: 20g, C: 40g, F: 30g" },
                { name: "Snack 1", summary: "Greek Yogurt, Honey, & Walnuts", calories: 220, macros: "P: 18g, C: 20g, F: 8g" },
                { name: "Lunch", summary: "Lentil Soup with Side Salad", calories: 600, macros: "P: 30g, C: 75g, F: 20g" },
                { name: "Snack 2", summary: "Sliced Cucumbers with Tzatziki", calories: 110, macros: "P: 5g, C: 10g, F: 5g" },
                { name: "Dinner", summary: "Grilled Shrimp Tacos with Cabbage Slaw", calories: 900, macros: "P: 70g, C: 80g, F: 35g" }
            ],
            dailyTotal: "2340 kcal"
        },
        {
            day: "Friday",
            meals: [
                { name: "Breakfast", summary: "Chia Seed Pudding (Almond Milk) with Fresh Fruit", calories: 430, macros: "P: 15g, C: 50g, F: 20g" },
                { name: "Snack 1", summary: "Protein Bar (20g protein)", calories: 240, macros: "P: 20g, C: 25g, F: 8g" },
                { name: "Lunch", summary: "Spinach & Feta Omelet with Whole Grain Toast", calories: 620, macros: "P: 45g, C: 40g, F: 30g" },
                { name: "Snack 2", summary: "Apple with Almond Butter", calories: 210, macros: "P: 5g, C: 30g, F: 10g" },
                { name: "Dinner", summary: "Ground Turkey Stuffed Peppers", calories: 850, macros: "P: 60g, C: 85g, F: 30g" }
            ],
            dailyTotal: "2350 kcal"
        },
        {
            day: "Saturday",
            meals: [
                { name: "Breakfast", summary: "Whole Grain Pancakes with Maple Syrup & Eggs", calories: 580, macros: "P: 30g, C: 70g, F: 20g" },
                { name: "Snack 1", summary: "Mixed Nuts & Seeds", calories: 250, macros: "P: 8g, C: 15g, F: 18g" },
                { name: "Lunch", summary: "Large Tuna Salad Sandwich on Whole Wheat", calories: 750, macros: "P: 55g, C: 60g, F: 35g" },
                { name: "Snack 2", summary: "Protein Shake", calories: 200, macros: "P: 30g, C: 10g, F: 5g" },
                { name: "Dinner", summary: "Lean Steak with Roasted Potatoes & Sautéed Greens", calories: 970, macros: "P: 80g, C: 90g, F: 35g" }
            ],
            dailyTotal: "2750 kcal"
        },
        {
            day: "Sunday",
            meals: [
                { name: "Breakfast", summary: "Scrambled Eggs (3), Spinach, & Whole Grain Tortilla", calories: 490, macros: "P: 30g, C: 45g, F: 20g" },
                { name: "Snack 1", summary: "Orange", calories: 70, macros: "P: 1g, C: 15g, F: 0g" },
                { name: "Lunch", summary: "Leftover Steak & Veggies from Saturday", calories: 650, macros: "P: 50g, C: 35g, F: 35g" },
                { name: "Snack 2", summary: "Edamame Pods", calories: 180, macros: "P: 15g, C: 15g, F: 5g" },
                { name: "Dinner", summary: "Large Turkey Chili Bowl with Avocado", calories: 780, macros: "P: 65g, C: 70g, F: 25g" }
            ],
            dailyTotal: "2170 kcal"
        },
    ]
};

const MealPlanCard = () => {
  const [selectedDay, setSelectedDay] = useState(0);
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

  return (
    <div className="flex flex-col justify-between items-center gap-4 p-4 sm:p-6 bg-neutral-800/70 border border-neutral-700/60 shadow-md backdrop-blur-md transition-all rounded-xl">
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
                  className="w-full rounded-md hover:bg-neutral-700/40 p-3"
                >
                  <div className="">
                    <div className="flex flex-row gap-2 sm:text-lg text-green-500 font-medium justify-between">
                      <h3 className="">{meal.name}</h3>
                      <h3 className="">{meal.calories} kcal</h3>
                    </div>
                    <div className="flex flex-row gap-2 text-xs sm:text-sm text-neutral-400 font-medium justify-between">
                      <h3 className="">{meal.summary}</h3>
                      <h3>{meal.macros}</h3>
                    </div>
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
