import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/exercise')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/exercise"!</div>
}
