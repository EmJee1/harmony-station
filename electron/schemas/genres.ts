import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { genresToTracks } from '.'

export const genres = sqliteTable('genres', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
})

export const genresRelations = relations(genres, ({ many }) => ({
  genresToTracks: many(genresToTracks),
}))
