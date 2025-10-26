import { Link } from "@tanstack/react-router";
import { UserCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ProfileIcon() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="User menu"
          className="p-2 rounded-full hover:bg-neutral-700/40 transition-colors"
        >
          <UserCircle className="size-6 text-neutral-200 hover:text-white transition-colors" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        className="backdrop-blur-sm w-max px-1 py-2 flex flex-col rounded-md border border-neutral-700/80 bg-neutral-800/93"
      >
        <Link
          to="/profile"
          className="text-neutral-200 cursor-pointer px-4 py-1 rounded-sm hover:bg-green-600/80"
        >
          Profile
        </Link>
        <Link
          to="/login"
          className="text-neutral-200 cursor-pointer px-4 py-1 rounded-sm hover:bg-green-600/80"
        >
          Log Out
        </Link>
      </PopoverContent>
    </Popover>
  );
}
