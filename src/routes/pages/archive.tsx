import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/archive')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pages/archive"!</div>
}
