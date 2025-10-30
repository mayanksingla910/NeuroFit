import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import type { StepProps } from "@/types/onboardingForm";

export default function Step4({
  isEditable = true,
  isProfile = false,
  form,
  setForm,
}: StepProps) {
  return (
    <>
      {!isProfile && (
        <div>
          <h1 className="text-3xl font-bold text-green-500">Anything else?</h1>
          <p className="mt-3 text-neutral-300">
            Share any special goals, challenges, or requests for your AI coach.
            (Optional)
          </p>
        </div>
      )}
      <div className="flex flex-col justify-between gap-x-8 gap-y-6 w-full mt-8 lg:mt-14">
        {isProfile && <Label>Anything Else?</Label>}
        <Textarea
          disabled={!isEditable}
          placeholder="e.g. marathon, PCOS, vegan athlete, home workouts, avoid boring recipes"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              description: String(e.target.value),
            }))
          }
          className="min-h-24 max-h-60 resize-none custom-scrollbar disabled:cursor-default disabled:opacity-80"
        />
      </div>
    </>
  );
}
