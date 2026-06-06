import { createFileRoute } from "@tanstack/react-router";
import { useBookmarks } from "@/hooks/useBookmark";
import {BookmarkCard} from "@/components/BookmarkCard"

export const Route = createFileRoute("/pages/recent")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: bookmarks } = useBookmarks({ recentOnly: true })

  if (!bookmarks?.length)
		return <div className="p-6 text-black">Your recent bookmarks will appear here</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 items-start">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            id={bookmark.id}
            title={bookmark.title}
            url={bookmark.url}
            domain={new URL(bookmark.url).hostname}
            description={bookmark.description ?? ""}
            favicon_url={bookmark.favicon_url ?? ""}
            tags={bookmark.tags ?? []}
            isFavorite={bookmark.isFavorite}
          />
        ))}
      </div>
    </div>
  );
}
