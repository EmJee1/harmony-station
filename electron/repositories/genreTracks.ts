import { getDrizzle } from './database'
import type { GenreTracks } from '../../types/genre-tracks'
import * as schemas from '../schemas'

export async function getGenreTracks() {
  return getDrizzle().query.genresToTracks.findMany()
}

export async function addGenreTracks(genreTracks: GenreTracks[]) {
  await getDrizzle().insert(schemas.genresToTracks).values(genreTracks)
}

export async function clearGenreTracks() {
  await getDrizzle().delete(schemas.genresToTracks)
}
