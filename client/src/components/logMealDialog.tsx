import type { LoggedMeal } from "@/types/logMeal";
import { DialogClose, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";

interface LogMealDialogProps {
  onSubmit: (meal: LoggedMeal) => void;
  initialMeal?: LoggedMeal;
}

const defaultMeal: LoggedMeal = {
  name: "Breakfast",
  description: "",
  calories: 0,
  carbs: 0,
  protein: 0,
  fat: 0,
};

const LogMealDialog = ({ onSubmit, initialMeal }: LogMealDialogProps) => {
  const [meal, setMeal] = useState<LoggedMeal>(initialMeal || defaultMeal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(meal);
    setMeal(defaultMeal);
  };

  return (
    <DialogContent className="bg-neutral-900 border border-neutral-700/60">
      <DialogTitle className="text-xl font-bold text-green-500 mb-2">
        {initialMeal ? "Edit Meal" : "Log a Meal"}
      </DialogTitle>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2">Meal Type</Label>
            <Select
              value={meal.name}
              onValueChange={(val: LoggedMeal["name"]) =>
                setMeal((prev) => ({ ...prev, name: val }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Meal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Snack">Snack</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2">Calories (kcal)</Label>
            <Input
              type="number"
              value={meal.calories ?? ""}
              onFocus={(e) => {
                  if (Number(e.target.value) === 0) e.target.value = "";
                }}
              onChange={(e) =>
                setMeal((prev) => ({
                  ...prev,
                  calories: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["carbs", "protein", "fat"].map((key) => (
            <div key={key}>
              <Label className="mb-2">{key} (g)</Label>
              <Input
                type="number"
                onFocus={(e) => {
                  if (Number(e.target.value) === 0) e.target.value = "";
                }}
                value={meal[key as keyof LoggedMeal] as number ?? ""}
                onChange={(e) =>
                  setMeal((prev) => ({
                    ...prev,
                    [key]: Number(e.target.value),
                  }))
                }
              />
            </div>
          ))}
        </div>

        <div>
          <Label className="mb-2">Meal Description</Label>
          <Input
            type="text"
            value={meal.description}
            onChange={(e) =>
              setMeal((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className="text-neutral-200 bg-green-600 hover:bg-green-600/80"
            >
              {initialMeal ? "Save Changes" : "Add Meal"}
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
};

export default LogMealDialog;
