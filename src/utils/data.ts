import type { SidebarItem } from "./../../type";
import { AccessTimeIcon, BookmarkIcon, StarBorderIcon } from "../lib/icons";

export const sideItems: SidebarItem[] = [
  {
    id: "1",
    label: "All Bookmarks",
    href: "/",
    icon: BookmarkIcon,
  },
  {
    id: "2",
    label: "Recent",
    href: "/pages/recent",
    icon: AccessTimeIcon,
  },
  {
    id: "3",
    label: "Favorites",
    href: "/pages/favorite",
    icon: StarBorderIcon,
  },
];
