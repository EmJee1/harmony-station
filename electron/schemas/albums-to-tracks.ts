import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { albums, tracks } from '.'

export const albumsToTracks = sqliteTable('album_tracks', {
  albumId: integer('albumId')
    .notNull()
    .references(() => albums.id),
  trackId: integer('trackId')
    .notNull()
    .references(() => tracks.id),
})

export const albumsToTracksRelations = relations(albumsToTracks, ({ one }) => ({
  album: one(albums, {
    fields: [albumsToTracks.albumId],
    references: [albums.id],
  }),
  track: one(tracks, {
    fields: [albumsToTracks.trackId],
    references: [tracks.id],
  }),
}))
