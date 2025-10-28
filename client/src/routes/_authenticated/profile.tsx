import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Navbar from "@/components/navbar";
import Step1 from "@/components/onBoardingForm/step1";
import Step4 from "@/components/onBoardingForm/step4";
import type { FormData } from "@/types/onboardingForm";
import ProfileStep from "@/components/profileStep";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const [isEditable, setIsEditable] = useState<boolean>(false);
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
    description: "",
  });

  return (
    <div className="h-screen flex flex-col custom-scrollbar">
      <Navbar />

      <main
        className="
          flex-1 m-10 mx-auto w-[95%] md:w-[92%] 
          bg-neutral-800/70 border border-neutral-700/60 
          backdrop-blur-sm rounded-xl p-6 md:pr-2
          space-y-6 lg:overflow-hidden 
        "
      >
        <h1 className="text-2xl ml-2 font-extrabold text-green-500 tracking-wide">
          Profile
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:h-[calc(100vh-16rem)]">
          <aside className="sticky top-0 bg-black w-full lg:w-1/3 h-[33%] lg:h-full rounded-lg p-4">
            Sidebar Content
          </aside>

          <section className="w-full lg:w-2/3 overflow-auto pr-2">
            <p
              onClick={() => {
                setIsEditable(!isEditable);
              }}
              className={` py-2 px-4 w-fit rounded-md hover:bg-neutral-700/40 cursor-default transition-all duration-300 lg:mr-5 ml-auto ${isEditable ? "text-gray-200" : "text-green-600 hover:text-green-600/80"}`}
            >
              {isEditable ? "Save & Close" : "Edit"}
            </p>
            <Step1
              isEditable={isEditable}
              isProfile={true}
              form={form}
              setForm={setForm}
            />
            <div className="w-full h-0.5 rounded-3xl mt-12 bg-neutral-500/80" />
            <ProfileStep
              isEditable={isEditable}
              form={form}
              setForm={setForm}
            />
            <div className="w-full h-0.5 rounded-3xl mt-12 bg-neutral-500/80" />
            <Step4
              isEditable={isEditable}
              isProfile={true}
              form={form}
              setForm={setForm}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
