import { getDatabase } from './database'
import type { TrackArtists } from '../../types/track-artists'

export async function getTrackArtists() {
  return getDatabase()('track_artists')
}

export async function addTrackArtists(trackArtists: TrackArtists[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('track_artists', trackArtists, 500)
}

export async function clearTrackArtists() {
  return getDatabase()('track_artists').delete()
}
