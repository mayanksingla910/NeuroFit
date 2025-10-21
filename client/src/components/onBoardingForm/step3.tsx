import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const dietaryPreferences: string[] = [
  "No Restriction",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Keto",
  "Paleo",
];

export default function Step3() {

  const [selectedDiet, setSelectedDiet] = useState<string>("No Restriction");
  const [allergies, setAllergies] = useState<string>("");

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-green-500">
          Dietary Preferences
        </h1>
        <p className="mt-3 text-neutral-300">
          Let's personalize your meal plans
        </p>
      </div>
      <div className="flex flex-col justify-between gap-x-8 gap-y-12 w-full mt-8 lg:mt-14">
        <div className="flex flex-col gap-5">
          <Label>Dietary Preference</Label>
          <div className="flex flex-wrap justify-between gap-5">
            {dietaryPreferences.map((item:string, index:number) => (
              <div key={index} onClick={() => setSelectedDiet(item)} className={`flex items-center gap-2 p-3 border-2 rounded-md transition-colors lg:w-[30%] w-full sm:w-[45%] cursor-pointer  ${selectedDiet === item ? "bg-green-600 border-green-600 " : " hover:bg-green-600/90 "}`}>
                <h2>{item}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Label>Allergies or Food Restrictions</Label>
          <div>
            <Input placeholder="e.g., nuts, diary, gluten (optional)" value={allergies} onChange={(e) => setAllergies(String(e.target.value))} />
          </div>
        </div>
      </div>
    </>
  );
}
