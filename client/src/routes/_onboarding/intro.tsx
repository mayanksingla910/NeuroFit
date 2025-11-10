import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/_onboarding/intro")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const form = {
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
  }

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => navigate({ to: "/questions" }), 500); 
  };

  const handleSkip = async () => {
    setIsVisible(false);
    try{
      const res = await api.post("/profile", form)
      const userRes = await api.post("/user", { onboarded: true })
      if (res.data?.success && userRes.data?.success) {
        setTimeout(() => navigate({ to: "/dashboard" }), 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative bg-background flex flex-col min-h-svh justify-between text-center max-w-4xl mx-auto p-6 md:p-10"
        >
          <div className="mt-36 flex flex-col gap-6">
            <h1 className="text-green-600 text-2xl md:text-3xl font-bold">
              Let’s Personalize Your Experience
            </h1>
            <p className="font-semibold md:text-lg text-neutral-300">
              We’ll ask a few quick questions to tailor meal and fitness plans
              just for you.
            </p>
          </div>

          <div className="flex flex-col mt-28 items-center">
            <Button
              onClick={handleContinue}
              className="px-8 py-6 text-lg w-fit text-neutral-200 bg-green-600 transition-colors border hover:bg-green-600/80"
            >
              Continue
            </Button>
          </div>

          <div className="mt-auto mb-10 flex justify-center">
            <Button
              variant="link"
              onClick={handleSkip}
              className="hover:text-green-600"
            >
              Skip and Start with Default Plan
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
