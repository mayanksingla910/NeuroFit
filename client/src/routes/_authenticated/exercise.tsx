import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/exercise")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>
      <div className=" flex gap-2 items-center">
        <Loader2 className="size-5 animate-spin stroke-green-500" />
        In Progress</div>
    </div>
}
