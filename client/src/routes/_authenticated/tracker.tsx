import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/tracker')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/tracker"!</div>
}
