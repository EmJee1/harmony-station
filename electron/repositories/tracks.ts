import { DbTrack, Track } from '../../types/tracks'
import { getDatabase } from './database'

export async function getTracks(): Promise<DbTrack[]> {
  return getDatabase('tracks').find({})
}

export async function addTracks(track: Track[]): Promise<void> {
  await getDatabase('tracks').insertMany<Track>(track)
}

export async function clearTracks(): Promise<void> {
  await getDatabase('tracks').remove({}, { multi: true })
}

export async function compactTracks(): Promise<void> {
  getDatabase('tracks').persistence.compactDatafile()
}
