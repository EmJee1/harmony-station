import { DbTrack } from './tracks'

export interface Genre {
  name: string
}

export interface DbGenre extends Genre {
  id: number
  tracks?: DbTrack[]
}
