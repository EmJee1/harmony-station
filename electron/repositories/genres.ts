import { getDatabase } from './database'
import type { Genre } from '../../types/genres'

export async function getGenre(id: number) {
  return getDatabase()('genres').where({ id }).first()
}

export async function getGenres() {
  return getDatabase()('genres')
}

export async function addGenres(genres: Genre[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('genres', genres, 500)
}

export async function clearGenres() {
  return getDatabase()('genres').delete()
}
