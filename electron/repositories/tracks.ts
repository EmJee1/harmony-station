import { DbTrack, Track } from '../../types/tracks'
import { getDatabase } from './database'

export async function getTracks() {
  return getDatabase()('tracks')
}

export async function addTracks(tracks: Track[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('tracks', tracks, 500)
}

export async function clearTracks() {
  return getDatabase()('tracks').delete()
}
