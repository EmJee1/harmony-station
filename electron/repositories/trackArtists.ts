import { getDrizzle } from './database'
import type { TrackArtists } from '../../types/track-artists'
import * as schemas from '../schemas'

export function getTrackArtists() {
  return getDrizzle().query.tracksToArtists.findMany()
}

export async function addTrackArtists(trackArtists: TrackArtists[]) {
  await getDrizzle().insert(schemas.tracksToArtists).values(trackArtists)
}

export async function clearTrackArtists() {
  await getDrizzle().delete(schemas.tracksToArtists)
}
