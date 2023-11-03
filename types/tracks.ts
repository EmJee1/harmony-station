import type { DbArtist } from './artist'
import type { DbAlbum } from './albums'

export interface Track {
  path: string
  title: string
  genre?: string
  year?: number
}

export interface DbTrack extends Track {
  id: number
  artists?: DbArtist[]
  album?: DbAlbum
}
