import type { DbTrack } from './tracks'
import { DbAlbum } from './albums'

export interface Artist {
  name: string
}

export interface DbArtist extends Artist {
  id: number
  tracks?: DbTrack[]
  albums?: DbAlbum[]
}
