import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { albumsToTracks, tracksToArtists } from '.'

export const tracks = sqliteTable('tracks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  path: text('path').notNull(),
  title: text('title').notNull(),
  year: text('year').notNull(),
})

export const tracksRelations = relations(tracks, ({ many }) => ({
  albumsToTracks: many(albumsToTracks),
  tracksToArtists: many(tracksToArtists),
}))
