import { useQuery } from "@tanstack/react-query";
import { getBookmark } from "@/lib/actions/bookmark";

export function useBookmarks() {
    return useQuery({
        queryKey: ['bookmarks'],
        queryFn: () => getBookmark(),
    })
}
