import { useState } from "react";
import { Textarea } from "../ui/textarea";

export default function Step4() {
  const [description, setDescription] = useState<string>("");

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-green-500">Anything else?</h1>
        <p className="mt-3 text-neutral-300">
          Share any special goals, challenges, or requests for your AI coach.
          (Optional)
        </p>
      </div>
      <div className="flex flex-col justify-between gap-x-8 gap-y-12 w-full mt-8 lg:mt-14">
        <Textarea
          placeholder="e.g. marathon, PCOS, vegan athlete, home workouts, avoid boring recipes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-24 max-h-60"
        />
      </div>
    </>
  );
}
