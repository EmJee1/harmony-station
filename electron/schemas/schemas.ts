import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

export const tracks = sqliteTable('tracks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  path: text('path').notNull(),
  title: text('title').notNull(),
  year: text('year').notNull(),
})

export const tracksRelations = relations(tracks, ({ many }) => ({
  albumsToTracks: many(albumsToTracks),
}))

export const albums = sqliteTable('albums', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  cover: text('cover'),
})

export const albumsRelations = relations(albums, ({ many }) => ({
  tracks: many(albumsToTracks),
}))

export const albumsToTracks = sqliteTable('album_tracks', {
  albumId: integer('id')
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

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  audioDirectories: text('audioDirectories').notNull(),
})
