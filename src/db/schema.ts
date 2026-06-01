import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const link = pgTable('todos', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  title: text('text').notNull(),
  description: text('description'),
  favicon_url: text('favicon_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
