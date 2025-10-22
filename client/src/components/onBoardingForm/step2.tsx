import loseWeight from "@/assets/weight.png";
import buildMuscle from "@/assets/muscle.png";
import flexibility from "@/assets/flexibility.png";
import fitness from "@/assets/fitness.png";
import { Label } from "../ui/label";

import type { FormData } from "@/types/onboardingForm";

type StepProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
};

type ActivityLevel = {
  id: number;
  level: string;
  desc: string;
};

type FitnessGoal = {
  id: number;
  goal: string;
  icon: string;
};

const activityLevels: ActivityLevel[] = [
  {
    id: 1,
    level: "Sedentary",
    desc: "little to no exercise",
  },
  {
    id: 2,
    level: "Lightly Active",
    desc: "1-3 days/week",
  },
  {
    id: 3,
    level: "Moderately Active",
    desc: "3-5 days/week",
  },
  {
    id: 4,
    level: "Very Active",
    desc: "5-7 days/week",
  },
];

const fitnessGoals: FitnessGoal[] = [
  { id: 1, goal: "Lose Weight", icon: loseWeight },
  { id: 2, goal: "Build Muscle", icon: buildMuscle },
  { id: 3, goal: "Increase Flexibility", icon: flexibility },
  { id: 4, goal: "General Fitness", icon: fitness },
];

export default function Step2({ form, setForm }: StepProps) {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-green-500">Activity & Goals</h1>
        <p className="mt-3 text-neutral-300">
          Help us understand your lifestyle and objectives
        </p>
      </div>
      <div className="flex flex-col justify-between gap-x-8 gap-y-14 w-full mt-8 lg:mt-14">
        <div className="flex flex-col gap-5">
          <Label>Activity Level</Label>
          <div className="w-full justify-between flex flex-wrap gap-3">
            {activityLevels.map((item: ActivityLevel, index: number) => (
              <div
                key={index}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    activityLevel: Number(item.id),
                  }))
                }
                className={`flex flex-col p-3 border-2 rounded-md transition-colors gap-2 w-[45%] lg:w-[22%] cursor-pointer ${form.activityLevel === item.id ? "bg-green-600 border-green-600 " : " hover:bg-green-600/90 "}`}
              >
                <h2 className="font-semibold text-lg">{item.level}</h2>
                <p className="font-medium text-neutral-300 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Label>Fitness Goal</Label>
          <div className="w-full justify-between flex flex-wrap gap-3">
            {fitnessGoals.map((item: FitnessGoal, index: number) => (
              <div
                key={index}
                onClick={() =>
                  setForm((prev) => ({ ...prev, goal: Number(item.id) }))
                }
                className={`flex items-center p-3 border-2 rounded-md transition-colors gap-3 w-[45%] lg:w-[22%] cursor-pointer ${form.goal === item.id ? "bg-green-600 border-green-600 " : " hover:bg-green-600/90 "}`}
              >
                <img
                  src={item.icon}
                  alt={item.goal}
                  className={`size-8 text-white `}
                />
                <p className="font-medium text-neutral-300 text-sm">
                  {item.goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
