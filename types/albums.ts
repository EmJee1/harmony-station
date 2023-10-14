import type { DbTrack } from './tracks'
import type { DbArtist } from './artist'

export interface Album {
  title: string
  cover?: string
}

export interface DbAlbum extends Album {
  id: number
  tracks?: DbTrack[]
  albumArtists?: DbArtist[]
}
