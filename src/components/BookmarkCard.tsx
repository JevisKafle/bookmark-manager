import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  deleteBookmark,
  removeTagFromBookmark,
  toggleFavorite,
} from "@/lib/actions/bookmark";
import type { BookmarkCardProps } from "../../type";
import { StarBorderIcon, StarIcon } from "./../lib/icons";

export const BookmarkCard = ({
  id,
  title,
  domain,
  description,
  favicon_url,
  tags,
  url,
  isFavorite: initialFavorite,
}: BookmarkCardProps) => {

  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const queryClient = useQueryClient();

  const handleFavorite = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsFavorite((prev) => !prev);
    await toggleFavorite({ data: { id, isFavorite } });
    queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
  };

  const handleDelete = async () => {
    await deleteBookmark({ data: { id } });
    queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <a
          className="group bg-[#131313] p-2 rounded-xl flex flex-col hover:border-[hsl(239,84%,67%)]/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-200 cursor-pointer"
          href={url}
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            window.open(url, "_blank");
          }}
          onKeyDown={(e) => e.key === "Enter" && window.open(url, "_blank")}
        >
          <div className="h-28 md:h-36 bg-[#0d0d0d] relative overflow-hidden">
            <div className="inset-0 absolute bg-linear-to-br from-white/3 to-transparent flex items-center justify-center">
              <img
                src={favicon_url || `https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                alt={title ?? "favicon"}
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.onerror = null;
                  el.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
                }}
                className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300"
              />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
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

          <div className="flex flex-col gap-1.5 p-3">
            <div className="flex items-center gap-1.5">
              <img
                src={favicon_url || `https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                alt={title ?? "favicon"}
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.onerror = null;
                  el.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
                }}
                className="w-3 h-3 md:w-4 md:h-4 rounded-sm shrink-0"
              />
              <h3 className="text-white">{title}</h3>
            </div>
            <div className="text-zinc-500 text-sm">{domain}</div>
            <p className="line-clamp-2 text-zinc-500 leading-tight text-sm truncate">
              {description}
            </p>
            <div>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-white/5 text-zinc-400 border border-white/5 w-fit"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault(); // 👈 add this
                      e.stopPropagation();
                      await removeTagFromBookmark({
                        data: { linkId: id, tagName: tag },
                      });
                      queryClient.invalidateQueries({
                        queryKey: ["bookmarks"],
                      });
                    }}
                    className="opacity-0 hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all cursor-pointer leading-none [span:hover_&]:opacity-100"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </a>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-44">
        <ContextMenuItem onClick={() => handleFavorite()}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive" onClick={handleDelete}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
