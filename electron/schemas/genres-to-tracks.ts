import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { genres, tracks } from '.'

export const genresToTracks = sqliteTable('genre_tracks', {
  genreId: integer('genreId')
    .notNull()
    .references(() => genres.id),
  trackId: integer('trackId')
    .notNull()
    .references(() => tracks.id),
})

export const genresToTracksRelations = relations(genresToTracks, ({ one }) => ({
  genre: one(genres, {
    fields: [genresToTracks.genreId],
    references: [genres.id],
  }),
  track: one(tracks, {
    fields: [genresToTracks.trackId],
    references: [tracks.id],
  }),
}))
