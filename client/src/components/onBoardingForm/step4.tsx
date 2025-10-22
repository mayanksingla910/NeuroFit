import { Textarea } from "../ui/textarea";
import type { FormData } from "@/types/onboardingForm";

type StepProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function Step4({ form, setForm }: StepProps) {
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
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              description: String(e.target.value),
            }))
          }
          className="min-h-24 max-h-60"
        />
      </div>
    </>
  );
}
