import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/favorite')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pages/favorite"!</div>
}
