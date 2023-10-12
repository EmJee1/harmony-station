export interface Track {
  path: string
  title: string
  genre?: string
  year?: number
}

export interface DbTrack extends Track {
  id: number
}
