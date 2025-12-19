import api from "@/lib/api";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_onboarding")({
  beforeLoad: async () => {
    const onboarded = localStorage.getItem("onboarded");

    if (onboarded) throw redirect({ to: "/dashboard" });

    try {
      const response = await api.get(`/user`);

      if (response.data.success) {
        if (response.data.data.onboarded) {
          localStorage.setItem("onboarded", "true");
          throw redirect({ to: "/dashboard" });
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
      <Outlet />
  );
}
