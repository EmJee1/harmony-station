import { getDatabase } from './database'
import type { GenreTracks } from '../../types/genre-tracks'

export async function getGenreTracks() {
  return getDatabase()('genre_tracks')
}

export async function addGenreTracks(genreTracks: GenreTracks[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('genre_tracks', genreTracks, 500)
}

export async function clearGenreTracks() {
  return getDatabase()('genre_tracks').delete()
}
