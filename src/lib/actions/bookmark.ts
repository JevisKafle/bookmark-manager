import { createServerFn } from "@tanstack/react-start";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

async function  getPageData(url:string) {
    const res = await fetch(url)
    const html = await res.text()

    const title = html.match(/<title>(.*?)<\title>/i)?.[1] ?? url
    const description = html.match(/<meta name="description" content="(.*?)"/i)?.[1] ?? ""
    const favicon_url = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`

    return {title,description,favicon_url}
}


export const addBookmark = createServerFn({ method: "POST" })
	.inputValidator((data: { url: string }) => data)
	.handler(async ({ data }) => {

        const meta = await getPageData(data.url)

		const [newLink] = await db
			.insert(links)
			.values({
				url: data.url,
                title: meta.title,
                description: meta.description,
                favicon_url: meta.favicon_url
			})
			.returning();
        return newLink
	});

export const getBookmark = createServerFn({ method: "GET"})
    .handler( async () => {
        return await db.select().from(links).orderBy(desc(links.createdAt))
    })
