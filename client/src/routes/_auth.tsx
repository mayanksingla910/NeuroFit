import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const token = localStorage.getItem('token')
    if (token) throw redirect({ to: '/dashboard' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet/>
}
