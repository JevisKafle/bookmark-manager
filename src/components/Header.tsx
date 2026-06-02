import { SearchIcon } from "./../lib/icons";
import { AddLinkModal } from "./AddLink";
import { Input } from "./ui/input";

export const Header = () => {
	return (
		<header className="bg-black flex items-center  px-10 py-[13.9px] border justify-between">
             <span className="text-sm font-semibold tracking-wide sm:hidden">Bookmarks Vault</span>
			<div className="relative w-90">
				<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none" />
				<Input
					placeholder="Search Bookmarks... "
					className="w-90 bg-gray-800 pl-12 pb-2 "
				/>
			</div>
			<AddLinkModal/>
		</header>
	);
};
