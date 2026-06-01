import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/recent')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pages/recent"!</div>
}
