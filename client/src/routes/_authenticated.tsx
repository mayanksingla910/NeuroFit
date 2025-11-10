import Navbar from "@/components/navbar";
import { UserProvider } from "@/provider/userProvider";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw redirect({ to: "/login" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen font-inter custom-scrollbar">
      <Navbar />
      <main className="w-full md:w-[95%] mx-auto px-6 py-10 ">
        <UserProvider>
          <Outlet />
        </UserProvider>
      </main>
    </div>
  );
}
