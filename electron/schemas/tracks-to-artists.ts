import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { tracks, artists } from '.'

export const tracksToArtists = sqliteTable('track_artists', {
  trackId: integer('trackId')
    .notNull()
    .references(() => tracks.id),
  artistId: integer('artistId')
    .notNull()
    .references(() => artists.id),
})

export const tracksToArtistsRelations = relations(
  tracksToArtists,
  ({ one }) => ({
    track: one(tracks, {
      fields: [tracksToArtists.trackId],
      references: [tracks.id],
    }),
    artist: one(artists, {
      fields: [tracksToArtists.artistId],
      references: [artists.id],
    }),
  })
)
