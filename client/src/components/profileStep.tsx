import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { FormData, StepProps } from "@/types/onboardingForm";
import { Input } from "./ui/input";

export default function ProfileStep({ isEditable, form, setForm }: StepProps) {
  return (
    <>
      <div className="flex justify-between gap-x-8 gap-y-16 flex-wrap w-full mt-8 lg:mt-14">
        <div className="flex flex-col gap-3 w-[45%]">
          <Label>Activity Level</Label>
          <Select
            disabled={!isEditable}
            value={form.activityLevel?.toString()}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                activityLevel: Number(value) as FormData["activityLevel"],
              }))
            }
          >
            <SelectTrigger className="w-full disabled:cursor-default disabled:opacity-80">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Sedentary</SelectItem>
                <SelectItem value="2">Lightly Active</SelectItem>
                <SelectItem value="3">Moderately Active</SelectItem>
                <SelectItem value="4">Very Active</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3 w-[45%]">
          <Label>Fitness Goal</Label>
          <Select
            disabled={!isEditable}
            value={form.goal?.toString()}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                goal: Number(value) as FormData["goal"],
              }))
            }
          >
            <SelectTrigger className="w-full disabled:cursor-default disabled:opacity-80">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Lose Weight</SelectItem>
                <SelectItem value="2">Build Muscle</SelectItem>
                <SelectItem value="3">Increase Flexibility</SelectItem>
                <SelectItem value="4">General Fitness</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3 w-[45%]">
          <Label>Dietary Preference</Label>
          <Select
            disabled={!isEditable}
            value={form.diet}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                diet: value as FormData["diet"],
              }))
            }
          >
            <SelectTrigger className="w-full disabled:cursor-default disabled:opacity-80">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="No Restriction">No Restriction</SelectItem>
                <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                <SelectItem value="Vegan">Vegan</SelectItem>
                <SelectItem value="Pescatarian">Pescatarian</SelectItem>
                <SelectItem value="Keto">Keto</SelectItem>
                <SelectItem value="Paleo">Paleo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3 w-[45%]">
          <Label>Allergies</Label>
          <div>
            <Input
              disabled={!isEditable}
              placeholder="e.g., nuts, diary, gluten (optional)"
              value={form.allergies}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  allergies: String(e.target.value),
                }))
              }
              className="disabled:cursor-default disabled:opacity-80"
            />
          </div>
        </div>
      </div>
    </>
  );
}
