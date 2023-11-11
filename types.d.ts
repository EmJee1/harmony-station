import type { DbTrack } from './types/tracks'
import type { DbArtist } from './types/artist'
import type { DbAlbum } from './types/albums'
import type { DbGenre } from './types/genres'
import type { DbAlbumTracks } from './types/album-tracks'
import type { DbAlbumArtists } from './types/album-artists'
import type { DbTrackArtists } from './types/track-artists'
import type { DbGenreTracks } from './types/genre-tracks'
import type { SettingsTable } from './types/settings'

declare module 'knex/types/tables' {
  interface Tables {
    tracks: DbTrack
    artists: DbArtist
    albums: DbAlbum
    genres: DbGenre
    genre_tracks: DbGenreTracks
    album_tracks: DbAlbumTracks
    album_artists: DbAlbumArtists
    track_artists: DbTrackArtists
    settings: SettingsTable
  }
}
