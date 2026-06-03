import { integer, pgTable, primaryKey, serial, text, timestamp} from 'drizzle-orm/pg-core'

export const link = pgTable('todos', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  title: text('text').notNull(),
  description: text('description'),
  favicon_url: text('favicon_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
})

export const link_tags = pgTable('link_tags', {
  link_id: integer('link_id').references(() => link.id, { onDelete: 'cascade' }),
  tag_id: integer('tag_id').references(() => tags.id, { onDelete: 'cascade' }),
}, (t) => [
  primaryKey({ columns: [t.link_id, t.tag_id] }),
])

//pnpm drizzle-kit push