import { createFileRoute } from "@tanstack/react-router";
import { AllBookmarks } from "@/components/AllBookmarks";
import { getBookmark } from "@/lib/actions/bookmark";

export const Route = createFileRoute("/")({
	loader: () => getBookmark({ data: { favoriteOnly: false } }),
	pendingComponent: () => {
		return <div className="text-2xl text-white p-5">Loading...</div>;
	},
	component: AllBookmarks,
});
