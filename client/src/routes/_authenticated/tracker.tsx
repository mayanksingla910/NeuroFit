import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tracker")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="flex flex-wrap justify-between gap-2">
    <div className="w-full lg:w-2/3 bg-white h-10 rounded-lg"></div>
    <div className="w-full lg:w-[32%] bg-gray-500 h-10 rounded-lg"></div>
  </div>;
}
