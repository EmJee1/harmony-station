import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { albums, artists } from '.'

export const albumsToArtists = sqliteTable('album_artists', {
  albumId: integer('albumId')
    .notNull()
    .references(() => albums.id),
  artistId: integer('artistId')
    .notNull()
    .references(() => artists.id),
})

export const albumsToArtistsRelations = relations(
  albumsToArtists,
  ({ one }) => ({
    album: one(albums, {
      fields: [albumsToArtists.albumId],
      references: [albums.id],
    }),
    artist: one(artists, {
      fields: [albumsToArtists.artistId],
      references: [artists.id],
    }),
  })
)
