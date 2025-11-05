import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {

  // const navigate = useNavigate();

  // React.useEffect(() =>{
  //   navigate({to: "/dashboard"})
  // })

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
