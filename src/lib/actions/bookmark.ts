import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { links,tags,link_tags} from "@/db/schema";

async function getPageData(url: string) {
	const res = await fetch(url);
	const html = await res.text();

	const title = html.match(/<title>(.*?)<\title>/i)?.[1] ?? url;
	const description =
		html.match(/<meta name="description" content="(.*?)"/i)?.[1] ?? "";
	const favicon_url = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;

	return { title, description, favicon_url };
}

export const addBookmark = createServerFn({ method: 'POST' })
  .inputValidator((data: { url: string; tags: string[] }) => data)
  .handler(async ({ data }) => {
    const meta = await getPageData(data.url)

    const [newLink] = await db.insert(links).values({
      url: data.url,
      title: meta.title,
      description: meta.description,
      favicon_url: meta.favicon_url,
    }).returning()


    if (data.tags.length > 0) {
      for (const tagName of data.tags) {
        const [tag] = await db.select().from(tags).where(eq(tags.name, tagName))
        if (tag) {
          await db.insert(link_tags).values({
            link_id: newLink.id,
            tag_id: tag.id,
          })
        }
      }
    }

    return newLink
  })



export const getBookmark = createServerFn({ method: 'GET' })
  .inputValidator((data: { favoriteOnly?: boolean }) => data)
  .handler(async ({ data }) => {
    const rows = await db
      .select({
        id: links.id,
        url: links.url,
        title: links.title,
        description: links.description,
        favicon_url: links.favicon_url,
        isFavorite: links.isFavorite,
        createdAt: links.createdAt,
        tagName: tags.name,
      })
      .from(links)
      .leftJoin(link_tags, eq(link_tags.link_id, links.id))
      .leftJoin(tags, eq(tags.id, link_tags.tag_id))
      .where(data.favoriteOnly ? eq(links.isFavorite, true) : undefined)
      .orderBy(desc(links.createdAt))


    const bookmarkMap = new Map<number, any>()
    for (const row of rows) {
      if (!bookmarkMap.has(row.id)) {
        bookmarkMap.set(row.id, { ...row, tags: [] })
      }
      if (row.tagName) {
        bookmarkMap.get(row.id).tags.push(row.tagName)
      }
    }

    return Array.from(bookmarkMap.values())
  })


export const toggleFavorite = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number; isFavorite: boolean }) => data)
	.handler(async ({ data }) => {
		await db
			.update(links)
			.set({ isFavorite: !data.isFavorite })
			.where(eq(links.id, data.id));
	});



export const addTags = createServerFn({method: "POST"})
	.inputValidator((data : {tag:string}) => data)
	.handler(async ({data}) => {
		const [newTag] = await db
			.insert(tags)
			.values({
				name : data.tag,
				slug: data.tag.toLowerCase().replace(/\s+/g, '-')
			}).returning()
		return newTag
	})



export const showTags = createServerFn({method: "GET"})
	.handler( async() => {
		return await db.select().from(tags)
	})

export const deleteBookmark = createServerFn({method: "POST"})
	.inputValidator((data: {id:number}) => data)
	.handler( async({data}) => {
		 await db.delete(links).where(eq(links.id,data.id))
	})


