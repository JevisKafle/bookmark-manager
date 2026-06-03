import type { BookmarkItems } from "../../../type"
import {BookmarkCard} from "../../components/BookmarkCard"

const bookmarks: BookmarkItems[] = [
    {
        id: '1',
        title: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
        domain: 'tailwindcss.com',
        description: 'Rapidly build modern websites without ever leaving your HTML.',
        favicon_url: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64',
        tags: ['CSS', 'Design'],
        created_at: '2024-01-10',
    },
    {
        id: '2',
        title: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
        domain: 'tailwindcss.com',
        description: 'Rapidly build modern websites without ever leaving your HTML.',
        favicon_url: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64',
        tags: ['CSS', 'Design'],
        created_at: '2024-01-10',
    },
    {
        id: '3',
        title: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
        domain: 'tailwindcss.com',
        description: 'Rapidly build modern websites without ever leaving your HTML.',
        favicon_url: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64',
        tags: ['CSS', 'Design'],
        created_at: '2024-01-10',
    },
    {
        id: '4',
        title: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
        domain: 'tailwindcss.com',
        description: 'Rapidly build modern websites without ever leaving your HTML.',
        favicon_url: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64',
        tags: ['CSS', 'Design'],
        created_at: '2024-01-10',
    },
    {
        id: '5',
        title: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
        domain: 'tailwindcss.com',
        description: 'Rapidly build modern websites without ever leaving your HTML.',
        favicon_url: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64',
        tags: ['CSS', 'Design'],
        created_at: '2024-01-10',
    },
    {
        id: '6',
        title: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
        domain: 'tailwindcss.com',
        description: 'Rapidly build modern websites without ever leaving your HTML.',
        favicon_url: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64',
        tags: ['CSS', 'Design'],
        created_at: '2024-01-10',
    },
]


export function AllBookmarks() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {bookmarks.map(bookmark => (
          <BookmarkCard key={bookmark.id} {...bookmark} />
        ))}
      </div>
    </div>
  )
}