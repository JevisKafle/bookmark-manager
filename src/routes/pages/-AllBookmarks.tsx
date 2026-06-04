import { useBookmarks } from "@/hooks/useBookmark";
//import type { BookmarkItems } from "../../../type"
import { BookmarkCard } from "../../components/BookmarkCard";

// const bookmarks: BookmarkItems[] = [
//   {
//     id: '1',
//     title: 'Tailwind CSS',
//     url: 'https://tailwindcss.com',
//     domain: 'tailwindcss.com',
//     description: 'Rapidly build modern websites without ever leaving your HTML.',
//     favicon_url: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64',
//     tags: ['CSS', 'Design'],
//     created_at: '2024-01-10',
//   },
//   {
//     id: '2',
//     title: 'Next.js',
//     url: 'https://nextjs.org',
//     domain: 'nextjs.org',
//     description: 'The React framework for production applications.',
//     favicon_url: 'https://www.google.com/s2/favicons?domain=nextjs.org&sz=64',
//     tags: ['React', 'Framework'],
//     created_at: '2024-01-15',
//   },
//   {
//     id: '3',
//     title: 'TypeScript',
//     url: 'https://www.typescriptlang.org',
//     domain: 'typescriptlang.org',
//     description: 'JavaScript with syntax for types.',
//     favicon_url: 'https://www.google.com/s2/favicons?domain=typescriptlang.org&sz=64',
//     tags: ['JavaScript', 'Programming'],
//     created_at: '2024-01-20',
//   },
//   {
//     id: '4',
//     title: 'MDN Web Docs',
//     url: 'https://developer.mozilla.org',
//     domain: 'developer.mozilla.org',
//     description: 'Resources for developers, by developers.',
//     favicon_url: 'https://www.google.com/s2/favicons?domain=developer.mozilla.org&sz=64',
//     tags: ['Documentation', 'Web'],
//     created_at: '2024-01-25',
//   },
//   {
//     id: '5',
//     title: 'Figma',
//     url: 'https://figma.com',
//     domain: 'figma.com',
//     description: 'Collaborative interface design tool.',
//     favicon_url: 'https://www.google.com/s2/favicons?domain=figma.com&sz=64',
//     tags: ['Design', 'UI/UX'],
//     created_at: '2024-02-01',
//   },
//   {
//     id: '6',
//     title: 'GitHub',
//     url: 'https://github.com',
//     domain: 'github.com',
//     description: 'Build and ship software on a single platform.',
//     favicon_url: 'https://www.google.com/s2/favicons?domain=github.com&sz=64',
//     tags: ['Code', 'Development'],
//     created_at: '2024-02-05',
//   },
//   {
//     id: '7',
//     title: 'Vercel',
//     url: 'https://vercel.com',
//     domain: 'vercel.com',
//     description: 'Frontend cloud platform for modern web applications.',
//     favicon_url: 'https://www.google.com/s2/favicons?domain=vercel.com&sz=64',
//     tags: ['Hosting', 'Deployment'],
//     created_at: '2024-02-10',
//   },
//   {
//     id: '8',
//     title: 'React',
//     url: 'https://react.dev',
//     domain: 'react.dev',
//     description: 'The library for web and native user interfaces.',
//     favicon_url: 'https://www.google.com/s2/favicons?domain=react.dev&sz=64',
//     tags: ['JavaScript', 'Frontend'],
//     created_at: '2024-02-15',
//   },
// ];

export function AllBookmarks() {
	const { data: bookmarks, isLoading } = useBookmarks();

	if (isLoading) return <div className="p-6 text-zinc-500">Loading...</div>;
	if (!bookmarks?.length)
		return <div className="p-6 text-zinc-500">No bookmarks yet.</div>;

	return (
		<div className="p-6">
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
				{bookmarks.map((bookmark) => (
					 <BookmarkCard
            key={bookmark.id}
            title={bookmark.title}
            url={bookmark.url}
            domain={new URL(bookmark.url).hostname}
            description={bookmark.description ?? ''}
            favicon_url={bookmark.favicon_url ?? ''}
            tags={[]}
          />
				))}
			</div>
		</div>
	);
}
