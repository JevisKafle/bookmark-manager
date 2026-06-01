import { createFileRoute } from '@tanstack/react-router'
import {AllBookmarks} from './pages/-AllBookmarks'


export const Route = createFileRoute('/')({ component: App})

function App() {
  return (
    <main className="flex">
      <AllBookmarks/>
    </main>
  )
}
