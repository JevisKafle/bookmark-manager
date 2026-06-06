import { useQuery } from "@tanstack/react-query";
import { getBookmark } from "@/lib/actions/bookmark";

export function useBookmarks({ favoriteOnly = false,recentOnly = false } = {}) {
  return useQuery({
    queryKey: ['bookmarks', { favoriteOnly }],
    queryFn: () => getBookmark({ data: { favoriteOnly,recentOnly } }),
  })
}