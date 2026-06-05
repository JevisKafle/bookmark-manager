import { useQueryClient } from "@tanstack/react-query";
import  { useState } from "react";
import { toggleFavorite } from "@/lib/actions/bookmark";
import type { BookmarkCardProps } from "../../type";
import { StarBorderIcon, StarIcon } from "./../lib/icons";

export const BookmarkCard = ({
	id,
	title,
	domain,
	description,
	favicon_url,
	tags,
	isFavorite: initialFavorite,
}: BookmarkCardProps) => {
	const [isFavorite, setIsFavorite] = useState(initialFavorite);
	const queryClient = useQueryClient();

	const handleFavorite = async (e:React.MouseEvent) => {
		e.stopPropagation();
		setIsFavorite((prev) => !prev);
		await toggleFavorite({data : {id, isFavorite}})
		queryClient.invalidateQueries({queryKey: ['bookmarks']})
	};

	return (
		<div className="group bg-[#131313] p-2 rounded-xl flex flex-col hover:border-[hsl(239,84%,67%)]/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-200 cursor-pointer">
			<div className="h-36 bg-[#0d0d0d] relative overflow-hidden ">
				<div className="inset-0 absolute bg-linear-to-br from-white/3 to-transparent flex items-center justify-center">
					<img
						src={favicon_url}
						alt="title"
						className="w-10 h-10 opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300  "
					/>
					<div
						className="absolute inset-0 opacity-[0.04]"
						style={{
							backgroundImage:
								"linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>
					{/* Favorite button */}
					<button
						type="button"
						onClick={handleFavorite}
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
			{/* Content below image */}
			<div className="flex flex-col gap-1.5 p-3">
				<div className="flex items-center gap-1.5">
					<img
						src={favicon_url}
						alt=""
						className="w-4 h-4 rounded-sm shrink-0"
					/>
					<h3 className="text-white ">{title}</h3>
				</div>
				<div className="text-zinc-500 text-sm">{domain}</div>
				<p className="truncate text-zinc-500 leading-tight text-sm">
					{description}
				</p>
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
