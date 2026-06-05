import { Link, useRouterState } from "@tanstack/react-router";
import type { SidebarItem } from "../../type";
import {
	AccessTimeIcon,
	ArchiveIcon,
	BookmarkIcon,
	StarBorderIcon,
} from "../lib/icons";


const sideItems: SidebarItem[] = [
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
	{
		id: "4",
		label: "Archive",
		href: "/pages/archive",
		icon: ArchiveIcon,
	},
];

export const Sidebar = () => {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	return (
		<aside className="bg-black flex flex-col text-white w-60 h-screen border">
			<h1 className="mx-4 mt-4 text-2xl font-bold mb-4 text-white">
				Bookmarks Vault
			</h1>
			<hr />

			<ul className="mx-4 my-6 space-y-4 ">
				{sideItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<li key={item.id}>
							<Link
								to={item.href}
								className={`flex text-white items-center gap-2 w-full px-3 py-2 rounded transition hover:bg-[#1a1a1a] hover:-translate-y-0.5 ${
									isActive ? "bg-[#1a1a1a] font-bold" : ""
								}`}
							>
								<Icon />
								<span>{item.label}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};
