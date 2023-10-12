import type { DbTrack } from './types/tracks'
import type { DbArtist } from './types/artist'
import type { DbAlbum } from './types/albums'
import type { DbAlbumTracks } from './types/album-tracks'

declare module 'knex/types/tables' {
  interface Tables {
    tracks: DbTrack
    artists: DbArtist
    albums: DbAlbum
    album_tracks: DbAlbumTracks
  }
}
