import { useBookmarks } from "@/hooks/useBookmark";
import { BookmarkCard } from "../../components/BookmarkCard";

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
