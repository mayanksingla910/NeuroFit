import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { FormData } from "@/types/onboardingForm";
import Step1 from "@/components/onBoardingForm/step1";
import Step2 from "@/components/onBoardingForm/step2";
import Step3 from "@/components/onBoardingForm/step3";
import Step4 from "@/components/onBoardingForm/step4";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import api from "@/lib/api";

export const Route = createFileRoute("/_onboarding/questions")({
  component: RouteComponent,
});

function RouteComponent() {

  const [form, setForm] = useState<FormData>({
    age: 18,
    gender: "Male",
    height: 180,
    heightParam: "cm",
    weight: 70,
    weightParam: "kg",
    activityLevel: 2,
    goal: 4,
    diet: "No Restriction",
    allergies: "",
    description: ""
  });

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const totalSteps = 4;

  const navigate = useNavigate();

  const progress = (step / totalSteps) * 100;

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const stepComponents: Record<number, ReactNode> = {
    1: <Step1 form={form} setForm={setForm} />,
    2: <Step2 form={form} setForm={setForm} />,
    3: <Step3 form={form} setForm={setForm} />,
    4: <Step4 form={form} setForm={setForm} />,
  };

  const variants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 80 : -80,
    }),
    animate: { opacity: 1, x: 0 },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 80 : -80,
    }),
  };

  const handleSubmit = async () => {
    try{
      const response = await api.post(`/profile`, form);
      const userRes = await api.put("/user", { onboarded: true })
      console.log(response);
      if (response.data?.success && userRes.data?.success) {
        navigate({to: "/dashboard"});
        localStorage.setItem("onboarded", "true");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative bg-background flex max-w-4xl min-h-svh mx-auto gap-6 p-6 md:p-10 flex-col">
      <div className="w-full flex flex-col gap-3 justify-between mt-4">
        <p>
          Step {step} of {totalSteps}
        </p>
        <Progress value={progress} />
      </div>
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
            layout
          >
            <div>{stepComponents[step]}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="ml-auto mt-auto mb-10 flex gap-4">
        {step > 1 && (
          <Button
            variant="ghost"
            onClick={() => {
              setDirection(-1);
              prevStep();
            }}
            className="px-10 py-5"
          >
            <ChevronLeft size="5" />
            Back
          </Button>
        )}

        {step < totalSteps ? (
          <Button
            onClick={() => {
              setDirection(1);
              nextStep();
            }}
            className="px-10 py-5 bg-accent border hover:bg-green-600/80 text-neutral-200"
          >
            Next
            <ChevronRight className="size-5" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="px-10 py-5 bg-green-600 hover:bg-green-600/80 text-neutral-200"
          >
            Finish
            <ChevronRight className="size-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
