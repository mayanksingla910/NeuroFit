import Chatbox from "@/components/chatbox";
import Navbar from "@/components/navbar";
import  WeightChart  from "@/components/weightChart";
import WelcomeCard from "@/components/welcomeCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen text-neutral-100">
      <Navbar />

      <main className="w-full md:w-[90%] mx-auto px-6 py-12 space-y-10">
        <WelcomeCard />
        {/* <Chatbox /> */}
        <WeightChart />
      </main>
    </div>
  );
}
