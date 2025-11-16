import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { workoutPlan } from "@/assets/WorkoutPlan";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import type { LoggedWorkout, WorkoutPlan } from "@/types/workout";

const todayIndex = new Date().getDay() - 1;

export default function WorkoutComboBox({
  workout,
  setWorkout,
}: {
  workout: LoggedWorkout;
  setWorkout: React.Dispatch<React.SetStateAction<LoggedWorkout>>;
}) {
  const [open, setOpen] = useState(false);

  const [selectedDay, setSelectedDay] = useState<string>(
    workoutPlan[todayIndex]?.day || "Monday"
  );

  const exercises =
    selectedDay === "All"
      ? workoutPlan.flatMap((d) => d.exercises as WorkoutPlan["exercises"])
      : workoutPlan.find((d) => d.day === selectedDay)?.exercises || [];

  return (
    <div className="flex w-full flex-wrap custom-scrollbar">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-2/3 justify-between rounded-r-none"
          >
            {workout.name || "Select exercise"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 custom-scrollbar">
          <Command >
            <CommandInput required placeholder="Search exercise..." className="h-9" />
            <CommandList >
              <CommandEmpty>No result.</CommandEmpty>
              <CommandGroup >
                {exercises.map((item) => (
                  <CommandItem
                    key={item.name}
                    value={item.name}
                    onSelect={(currentValue) => {
                      setWorkout((prev) => ({
                        ...prev,
                        name: currentValue,
                        image: item.image,
                      }));
                      setOpen(false);
                    }}
                  >
                    {item.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        workout.name === item.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Select
        value={selectedDay}
        onValueChange={(day) => {
          setSelectedDay(day);
          setWorkout((prev) => ({
            ...prev,
            name: "",
          }));
          setOpen(false);
        }}
      >
        <SelectTrigger className="rounded-l-none w-1/3">
          {selectedDay}
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="All">All</SelectItem>
            {workoutPlan.map((d) => (
              <SelectItem key={d.day} value={d.day}>
                {d.day}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
