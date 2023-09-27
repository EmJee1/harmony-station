export interface TrackMetadata {
  title?: string
  albumArtist?: string
  artists?: string[]
  genre?: string
  album?: string
  year?: number
  trackTotal?: number
  trackNumber?: number
}

export interface Track extends TrackMetadata {
  id: string
  path: string
}
