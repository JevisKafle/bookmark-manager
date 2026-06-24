import { createServerFn } from "@tanstack/react-start";
import type { SQL } from "drizzle-orm";
import { and, desc, eq, gte } from "drizzle-orm";
import { db } from "@/db";
import { link_tags, links, tags } from "@/db/schema";

async function getPageData(url: string) {
  const res = await fetch(url);
  const html = await res.text();

  const title =
    html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] ??
    html.match(/<meta property="og:title" content="(.*?)"/i)?.[1] ??
    new URL(url).hostname;
  const description =
    html.match(/<meta name="description" content="(.*?)"/i)?.[1] ?? "";
  const favicon_url = `https://icons.duckduckgo.com/ip3/${new URL(url).hostname}.ico`;

  return { title, description, favicon_url };
}

export const addBookmark = createServerFn({ method: "POST" })
  .inputValidator((data: { url: string; tags: string[] }) => data)
  .handler(async ({ data }) => {
    const meta = await getPageData(data.url);

    const [newLink] = await db
      .insert(links)
      .values({
        url: data.url,
        title: meta.title,
        description: meta.description,
        favicon_url: meta.favicon_url,
      })
      .returning();

    if (data.tags.length > 0) {
      for (const tagName of data.tags) {
        let [tag] = await db.select().from(tags).where(eq(tags.name, tagName));
        if (!tag) {
          const [newTag] = await db
            .insert(tags)
            .values({
              name: tagName,
              slug: tagName.toLowerCase().replace(/\s+/g, "-"),
            })
            .returning();
          tag = newTag;
        }
        await db.insert(link_tags).values({
          link_id: newLink.id,
          tag_id: tag.id,
        });
      }
    }

    return newLink;
  });

type BookmarkRow = {
  id: number;
  url: string;
  title: string;
  description: string | null;
  favicon_url: string | null;
  isFavorite: boolean;
  createdAt: Date;
  tags: string[];
};

export const getBookmark = createServerFn({ method: "GET" })
  .inputValidator(
    (data: { favoriteOnly?: boolean; recentOnly?: boolean }) => data,
  )
  .handler(async ({ data }) => {
    let whereClause: SQL | undefined;

    if (data.favoriteOnly) {
      whereClause = eq(links.isFavorite, true);
    } else if (data.recentOnly) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      whereClause = gte(links.createdAt, sevenDaysAgo);
    }

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
      .where(whereClause)
      .orderBy(desc(links.createdAt));

    const bookmarkMap = new Map<number, BookmarkRow>();
    for (const row of rows) {
      if (!bookmarkMap.has(row.id)) {
        const { tagName, ...rest } = row;
        bookmarkMap.set(row.id, { ...rest, tags: [] });
      }

      if (row.tagName) {
        const bookmark = bookmarkMap.get(row.id);
        if (bookmark) {
          bookmark.tags.push(row.tagName);
        }
      }
    }
    return Array.from(bookmarkMap.values());
  });

export const toggleFavorite = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number; isFavorite: boolean }) => data)
  .handler(async ({ data }) => {
    await db
      .update(links)
      .set({ isFavorite: !data.isFavorite })
      .where(eq(links.id, data.id));
  });

export const addTags = createServerFn({ method: "POST" })
  .inputValidator((data: { tag: string }) => data)
  .handler(async ({ data }) => {
    const [newTag] = await db
      .insert(tags)
      .values({
        name: data.tag,
        slug: data.tag.toLowerCase().replace(/\s+/g, "-"),
      })
      .returning();
    return newTag;
  });

export const showTags = createServerFn({ method: "GET" }).handler(async () => {
  return await db.select().from(tags);
});

export const deleteBookmark = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await db.delete(links).where(eq(links.id, data.id));
  });

export const removeTagFromBookmark = createServerFn({ method: "POST" })
  .inputValidator((data: { linkId: number; tagName: string }) => data)
  .handler(async ({ data }) => {
    const [tag] = await db
      .select()
      .from(tags)
      .where(eq(tags.name, data.tagName));

    if (!tag) return;

    await db
      .delete(link_tags)
      .where(
        and(eq(link_tags.link_id, data.linkId), eq(link_tags.tag_id, tag.id)),
      );
  });

export const deleteTag = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string }) => data)
  .handler(async ({ data }) => {
    const [tag] = await db.select().from(tags).where(eq(tags.name, data.name));

    if (!tag) return;
    await db.delete(tags).where(eq(tags.id, tag.id));
  });
