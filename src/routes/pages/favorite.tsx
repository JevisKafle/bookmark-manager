import { createFileRoute } from "@tanstack/react-router";
import { BookmarkCard } from "@/components/BookmarkCard"
import { useBookmarks } from "@/hooks/useBookmark";

export const Route = createFileRoute("/pages/favorite")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: bookmarks, isLoading } = useBookmarks({ favoriteOnly: true });

	if (isLoading) return <div className="p-6 text-zinc-500">Loading...</div>;
	if (!bookmarks?.length)
		return <div className="p-6 text-black">No Favorites yet.</div>;


	return (
		<div className="p-6">
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
				{bookmarks.map((bookmark) => (
					<BookmarkCard
						key={bookmark.id}
						id={bookmark.id}
						title={bookmark.title}
						url={bookmark.url}
						domain={new URL(bookmark.url).hostname}
						description={bookmark.description ?? ""}
						favicon_url={bookmark.favicon_url ?? ""}
						tags={[]}
						isFavorite={bookmark.isFavorite}
					/>
				))}
			</div>
		</div>
	);
}
