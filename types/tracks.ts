import type { DbArtist } from './artist'
import type { DbAlbum } from './albums'
import type { DbGenre } from './genres'

export interface Track {
  path: string
  title: string
  year?: number
}

export interface DbTrack extends Track {
  id: number
  artists?: DbArtist[]
  genres?: DbGenre[]
  album?: DbAlbum
}
