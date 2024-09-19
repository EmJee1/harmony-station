import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { albumsToArtists, albumsToTracks } from '.'

export const albums = sqliteTable('albums', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  cover: text('cover'),
})

export const albumsRelations = relations(albums, ({ many }) => ({
  albumsToTracks: many(albumsToTracks),
  albumsToArtists: many(albumsToArtists),
}))
