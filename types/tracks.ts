export interface Track {
  path: string
  title?: string
  albumArtist?: string
  artists: string[]
  genre: string[]
  album?: string
  year?: number
  trackTotal?: number
  trackNumber?: number
}

export interface DbTrack extends Track {
  id: string
}
