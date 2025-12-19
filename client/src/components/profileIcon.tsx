import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { UserCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ProfileIcon() {
  const router = useRouterState();
  const navigate = useNavigate();

  const isActive = router.location.pathname.includes("/profile");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("onboarded");
    navigate({to: "/login"});
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="User menu"
          className="p-2 rounded-full hover:bg-neutral-700/40 active:bg-neutral-700/60 transition-colors"
        >
          <UserCircle className="size-6 text-neutral-200 hover:text-white transition-colors" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        className="backdrop-blur-sm w-max px-1.5 py-2 flex flex-col rounded-md border border-neutral-700/80 bg-neutral-800/93"
      >
        <Link
          to="/profile"
          className={`text-neutral-200 cursor-pointer px-4 py-1 rounded-sm ${
            isActive
              ? "bg-green-600 hover:bg-green-600/80 text-white shadow-md"
              : "text-neutral-200 hover:text-white hover:bg-neutral-700/60"
          }`}
        >
          Profile
        </Link>
        <p
          onClick={handleLogout}
          className="text-neutral-200 hover:text-white hover:bg-neutral-700/60 cursor-pointer px-4 py-1 rounded-sm"
        >
          Log Out
        </p>
      </PopoverContent>
    </Popover>
  );
}
