import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Step1() {
  const [age, setAge] = useState<number>(18);
  const [gender, setGender] = useState<string>("Male");
  const [height, setHeight] = useState<number>(180);
  const [heightParam, setHeightParam] = useState<string>("cm");
  const [weight, setWeight] = useState<number>(70);
  const [weightParam, setWeightParam] = useState<string>("kg");

  const handleIncrement = () => setAge((prev) => Math.min(prev + 1, 100));
  const handleDecrement = () => setAge((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-green-500">Basic Information</h1>
        <p className="mt-3 text-neutral-300">Let's start with some basics about you</p>
      </div>
    <div className="flex justify-between gap-x-8 gap-y-16 flex-wrap w-full mt-8 md:mt-14 ">


      <div className="flex flex-col gap-3 w-[45%]">
        <Label htmlFor="age">Age</Label>
        <div className="relative">
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            min={0}
            max={100}
            className="w-full px-3 appearance-none text-center "
          />
          <div className="absolute right-2 top-0.5 flex flex-col">
            <button
              type="button"
              onClick={handleIncrement}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              <ChevronUp className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-[45%]">
        <Label>Gender</Label>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
              <SelectItem value="Prefer Not To Say">
                Prefer Not To Say
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3 w-[45%]">
        <Label>Height</Label>
        <div className="w-full flex">
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-[75%] rounded-r-none text-center"
          />
          <Select value={heightParam} onValueChange={setHeightParam}>
            <SelectTrigger className="w-[25%] rounded-l-none">
              <SelectValue placeholder="cm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="cm">cm</SelectItem>
                <SelectItem value="inch">inch</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[45%]">
        <Label>Weight</Label>
        <div className="w-full flex">
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-[75%] rounded-r-none text-center"
          />
          <Select value={weightParam} onValueChange={setWeightParam}>
            <SelectTrigger className="w-[25%] rounded-l-none">
              <SelectValue placeholder="kg" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="lbs">lbs</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
    </div>
    </>
  );
}
