import Navbar from "@/components/navbar";
import { UserProvider } from "@/provider/userProvider";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw redirect({ to: "/login" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { location } = useRouterState();

  return (
    <div className="min-h-screen font-inter custom-scrollbar">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.href}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full md:w-[95%] mx-auto px-6 py-10"
        >
          <Suspense
            fallback={
              <div className="opacity-0 pointer-events-none">
              </div>
            }
          >
            <UserProvider>
              <Outlet />
            </UserProvider>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
