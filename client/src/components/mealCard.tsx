import type { Nutrition } from "@/types/logMeal";

const parameter = ["Calories", "Protein", "Carbs", "Fat"];

const now = new Date();
const formatted = now.toLocaleString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

const MealCard = ({nutrition}: {nutrition: Nutrition}) => {
  


  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8 p-6 bg-neutral-800/70 border border-neutral-700/60 shadow-md backdrop-blur-md hover:border-green-600/60 transition-all rounded-xl">
      <div>
        <h1 className="font-bold text-2xl text-neutral-100">Daily Total</h1>
        <p className="text-green-600/90 font-semibold">{formatted}</p>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap gap-6 items-center justify-between">
        {parameter.map((param, i) => (
          <div key={param} className="flex w-[40%] items-center gap-6">
            <div className="p-3 rounded-md  sm:w-full text-center min-w-28">
              <p className="text-green-500 font-semibold text-lg">
                {nutrition[param as keyof typeof nutrition]}
                {param !== "Calories" ? " g" : " Kcal"}
              </p>
              <p className="text-neutral-300">{param}</p>
            </div>

            {i !== parameter.length - 1 && (
              <div className="hidden sm:block h-14 w-px bg-neutral-700/70" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCard;
