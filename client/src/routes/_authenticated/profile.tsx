import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Navbar from "@/components/navbar";
import Step1 from "@/components/onBoardingForm/step1";
import Step4 from "@/components/onBoardingForm/step4";
import type { FormData } from "@/types/onboardingForm";
import ProfileStep from "@/components/profileStep";
import axios from "axios";
import { backendURL } from "@/lib/backendURL";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendURL}/profile`);
        setForm(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put(`${backendURL}/profile`, form);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen  custom-scrollbar">
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

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:h-[calc(100vh-16rem)] overflow-auto">
          <aside
            className="
            sticky top-0 w-full lg:w-1/3
            flex flex-col  items-center justify-start
            gap-6 p-6 rounded-2xl
            bg-gradient-to-b 
            transition-all duration-300
            "
          >
            <div
              className="flex flex-col md:flex-row lg:flex-col  items-center justify-start md:justify-center lg:justify-start lg:mt-10 md:gap-16 lg:gap-6
            gap-6"
            >
              <div className="relative">
                <div className="size-28 rounded-full bg-gradient-to-tr from-green-500/60 to-emerald-400/40 p-[2px] shadow-lg">
                  <div className="size-full rounded-full bg-neutral-900 flex items-center justify-center">
                    <span className="text-3xl font-semibold text-green-400">
                      M
                    </span>
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 size-3 bg-green-500 rounded-full border-2 border-neutral-900" />
              </div>

              <div className="text-center flex flex-col items-center gap-2">
                <h2 className="text-xl font-bold text-gray-100 tracking-wide">
                  Mayank Singla
                </h2>
                <p className="text-sm text-neutral-400 font-medium">Mayank</p>
                <p className="text-xs text-neutral-500 mt-1">
                  singlamayank10@gmail.com
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-8 lg:mt-4 pt-4 border-t border-neutral-700/60 w-full text-center">
              <p className="text-xs text-neutral-500 uppercase tracking-widest">
                Status: PRO Member
              </p>
            </div>
          </aside>

          <section className="w-full lg:w-2/3 pr-2">
            <div className="lg:mr-5 ml-auto flex items-center gap-4 ">
              <p
                onClick={() => {
                  setIsEditable(!isEditable);
                }}
                className={` py-2 px-4 w-fit rounded-md hover:bg-neutral-700/40 cursor-default transition-all ml-auto duration-200 ${isEditable ? "text-gray-200" : "text-green-600 hover:text-green-600/80"}`}
              >
                {isEditable ? "Cancel" : "Edit"}
              </p>
              {isEditable && (
              <Button onClick={handleSave} className="bg-green-600 text-neutral-300 hover:bg-green-600/80">
                Save
              </Button>)}
            </div>
            <Step1
              isEditable={isEditable}
              isProfile={true}
              form={form}
              setForm={setForm}
            />
            <div className="border rounded-3xl mt-12 border-neutral-600/80" />
            <ProfileStep
              isEditable={isEditable}
              form={form}
              setForm={setForm}
            />
            <div className="border rounded-3xl mt-12 border-neutral-600/80" />
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
