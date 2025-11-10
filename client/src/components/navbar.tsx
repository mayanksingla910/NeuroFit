import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useState } from "react";
import NavToggle from "./navToggle";
import ProfileIcon from "./profileIcon";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const [isExpanded, setIsExpanded] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/meal", label: "Meals" },
    { to: "/exercise", label: "Exercise" },
    { to: "/tracker", label: "Tracker" },
  ];

  return (
    <nav className="sticky top-5 mx-auto z-30 w-[95%] px-6 py-3 rounded-2xl backdrop-blur-md bg-neutral-800/60 border border-neutral-700/30 hover:shadow-md transition-all">
      <div className="flex justify-between items-center">
        <Link
          to="/dashboard"
          className="text-green-500 font-extrabold text-xl sm:text-2xl tracking-tight transition-all flex items-center gap-1"
        >
          Neuro <span className="text-neutral-200">Fit</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {links.map(({ to, label }) => {
              const isActive = currentPath === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "text-sm md:text-base font-semibold px-4 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-green-600 hover:bg-green-600/80 active:bg-green-600/90 text-white shadow-md"
                      : "text-neutral-200 hover:text-white hover:bg-neutral-700/40 active:bg-neutral-700/60"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <ProfileIcon />

          <div className="md:hidden flex gap-4 items-center">
            <NavToggle
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
              isExpanded={isExpanded}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0, y: 10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: 10 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2 mt-4">
              {links.map(({ to, label }) => {
                const isActive = currentPath === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      "text-sm font-semibold px-4 py-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-green-600 hover:bg-green-600/80 active:bg-green-600/90 text-white shadow-md"
                        : "text-neutral-200 hover:text-white hover:bg-neutral-700/40 active:bg-neutral-700/60"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
