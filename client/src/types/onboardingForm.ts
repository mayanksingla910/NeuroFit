export type FormData = {
  age: number;
  gender: "Male" | "Female" | "Others" | "Prefer Not To Say";
  height: number;
  heightParam: "cm" | "inch";
  weight: number;
  weightParam: "kg" | "lbs";
  activityLevel: number;
  goal: number;
  diet: string;
  allergies: string;
  description: string;
};

export type StepProps = {
  isEditable?: boolean;
  isProfile?: boolean;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
};
