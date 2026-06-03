import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEFAULT_TAGS = ["Reading", "Report", "Design", "Tools", "Videos"];

export function AddLinkModal() {
	const [url, setUrl] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [allTags, setAllTags] = useState(DEFAULT_TAGS);
	const [showNewTag, setShowNewTag] = useState(false);
	const [newTag, setNewTag] = useState("");

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	};

	const handleAddNewTag = () => {
		if (newTag.trim() && !allTags.includes(newTag.trim())) {
			const tag = newTag.trim();
			setAllTags((prev) => [...prev, tag]);
			setSelectedTags((prev) => [...prev, tag]);
		}
		setNewTag("");
		setShowNewTag(false);
	};

	const handleSubmit = () => {
		console.log({ url, tags: selectedTags });
	};

	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button className="bg-[hsl(239,84%,67%)] hover:bg-[hsl(239,88%,63%)] cursor-pointer">
						+ Add Link
					</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>Add Bookmark</DialogTitle>
						<DialogDescription>
							Add the URL of the webiste you want to bookmark.
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-y-5">
						<div className="flex flex-col gap-1.5">
							<Label htmlFor="url" className="text-xs uppercase tracking-wider">
								Target URL
							</Label>
							<Input
								id="url"
								placeholder="https://example.com"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<Label className="text-xs uppercase tracking-wider">
								Categories
							</Label>
							<div className="flex flex-wrap gap-2">
								{allTags.map((tag) => (
									<button
										key={tag}
										type="button"
										onClick={() => toggleTag(tag)}
										className={`px-3 py-1 rounded-full text-sm border transition cursor-pointer ${
											selectedTags.includes(tag)
												? "bg-[hsl(239,84%,67%)] border-[hsl(239,84%,67%)] text-white"
												: "bg-transparent border-zinc-600 text-zinc-300 hover:border-zinc-400"
										}`}
									>
										{tag}
									</button>
								))}

								{showNewTag ? (
									<input
										autoFocus
										value={newTag}
										onChange={(e) => setNewTag(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") handleAddNewTag();
											if (e.key === "Escape") {
												setNewTag("");
												setShowNewTag(false);
											}
										}}
										onBlur={handleAddNewTag}
										placeholder="Tag name..."
										className="px-3 py-1 rounded-full text-sm border border-zinc-500 bg-transparent text-white outline-none w-24"
									/>
								) : (
									<button
										type="button"
										onClick={() => setShowNewTag(true)}
										className="px-3 py-1 rounded-full text-sm border border-dashed border-zinc-600 text-zinc-400 hover:border-zinc-400 cursor-pointer transition"
									>
										+ New
									</button>
								)}
							</div>
						</div>
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							onClick={handleSubmit}
							className="bg-[hsl(239,84%,67%)] hover:bg-[hsl(239,88%,63%)] cursor-pointer"
						>
							Add Bookmark
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
