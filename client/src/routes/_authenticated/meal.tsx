import Navbar from '@/components/navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/meal')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='h-[200svh]'>
      <Navbar />
    <div className='m-10'>dashboard</div>
    </div>
}
