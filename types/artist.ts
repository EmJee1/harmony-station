import type { DbTrack } from './tracks'

export interface Artist {
  name: string
}

export interface DbArtist extends Artist {
  id: number
  tracks: DbTrack[]
}
