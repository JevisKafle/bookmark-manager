import { useState } from "react";
import type { BookmarkCardProps } from "../../type";
import {StarBorderIcon, StarIcon} from "./../lib/icons"

export const BookmarkCard = ({
	title,
	domain,
	description,
	favicon_url,
	tags,
}: BookmarkCardProps) => {
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<div className="group bg-[#131313] border border-white/5 rounded-xl overflow-hidden hover:border-[hsl(239,84%,67%)]/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-200 cursor-pointer flex flex-col">
			{/* Bookmark thumbnail */}
			<div className="h-36 bg-[#0d0d0d] relative overflow-hidden flex items-center justify-center">
				<div className="abosulte inset-0 bg-linear-to-br from-white/3 to-transparent ">
					<img
						src={favicon_url}
						alt={title}
						className="w-10 h-10 opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300"
					/>
					{/* grid pattern */}
					<div
						className="absolute inset-0 opacity-[0.04]"
						style={{
							backgroundImage:
								"linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px",
							backgroundSize: "24px 24px",
						}}
					/>
					{/* Favorite button */}
					<button
                        type="button"
						onClick={(e) => {
							e.stopPropagation(); // prevent card click
							setIsFavorite((prev) => !prev);
						}}
						className="absolute top-2 right-2 p-1 rounded-md bg-black/40 hover:bg-black/70 transition-all duration-200 cursor-pointer"
					>
						{isFavorite ? (
							<StarIcon className="w-4 h-4 text-yellow-400" />
						) : (
							<StarBorderIcon className="w-4 h-4 text-zinc-500 hover:text-zinc-300" />
						)}
					</button>
				</div>
			</div>

			{/*Content */}
			<div className="p-3 flex flex-col gap-1.5 flex-1">
				{/*title here */}
				<div className="flex items-center gap-1.5">
					<img
						src={favicon_url}
						alt=""
						className="w-3.5 h-3.5 rounded-sm shrink-0"
					/>
					<h3 className="text-white text-sm font-medium truncate leading-tight">
						{title}
					</h3>
				</div>

				{/*Domain name */}
				<p className="text-sm text-zinc-500">{domain}</p>

				{/*Desc */}
				<p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 flex-1">
					{description}
				</p>

				{/*Tags selected */}
				<div>
					{tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-zinc-400 border border-white/5 mx-0.5"
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
