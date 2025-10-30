import Chatbox from "@/components/chatbox";
import ChatInput from "@/components/chatInput";
import Navbar from "@/components/navbar";
import WeightChart from "@/components/weightChart";
import WelcomeCard from "@/components/welcomeCard";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import DayPlan from "@/components/dayPlan";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [viewChat, setViewChat] = useState<boolean>(false);

  return (
    <div className="min-h-screen text-neutral-100">
      <Navbar />

      <main className="w-full md:w-[95%] mx-auto px-6 py-12 space-y-10">
        <WelcomeCard />
        {/* <Chatbox /> */}
        <ChatInput viewChat={viewChat} setViewChat={setViewChat} />
        <DayPlan />
        <WeightChart />
      </main>
    </div>
  );
}
