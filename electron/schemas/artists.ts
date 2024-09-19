import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { albumsToArtists, tracksToArtists } from '.'

export const artists = sqliteTable('artists', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
})

export const artistsRelations = relations(artists, ({ many }) => ({
  albumsToArtists: many(albumsToArtists),
  tracksToArtists: many(tracksToArtists),
}))
