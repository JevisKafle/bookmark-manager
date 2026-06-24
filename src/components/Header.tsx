import { useState } from "react";
import { MenuIcon, SearchIcon } from "./../lib/icons";
import { AddLinkModal } from "./AddLink";
import MobileSidebar from "./MobileSidebar";
import { Input } from "./ui/input";

export const Header = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<header className="bg-black flex items-center px-4 sm:px-10 py-3 border justify-between">
				<div className="flex items-center gap-3">
					<button
						type="button"
						className="sm:hidden p-2"
						aria-label="Open menu"
						onClick={() => setOpen(true)}
					>
						<MenuIcon className={`w-6 h-6 text-white transition-transform duration-300 ${open ? 'rotate-90 scale-105' : ''}`} />
					</button>

					<span className="text-sm font-semibold tracking-wide block sm:hidden">
						Bookmark Manager
					</span>
				</div>

				<div className="relative flex-1 max-w-full sm:max-w-md mx-4 hidden sm:block">
					<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none" />
					<Input
						placeholder="Search Bookmarks..."
						className="w-full sm:w-80 bg-gray-800 pl-12 pb-2"
					/>
				</div>

				<div className="flex items-center">
					<AddLinkModal />
				</div>
			</header>

			<MobileSidebar open={open} onClose={() => setOpen(false)} />
		</>
	);
};
