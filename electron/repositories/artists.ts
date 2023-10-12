import { getDatabase } from './database'
import type { Artist } from '../../types/artist'

export async function getArtists() {
  return getDatabase()('artists')
}

export async function addArtists(artists: Artist[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('artists', artists, 500)
}

export async function clearArtists() {
  return getDatabase()('artists').delete()
}
