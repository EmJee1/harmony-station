import { eq } from 'drizzle-orm'
import { getDrizzle } from './database'
import type { Genre } from '../../types/genres'
import * as schemas from '../schemas'

export async function getGenre(id: number) {
  return getDrizzle().query.genres.findFirst({
    where: eq(schemas.genres.id, id),
  })
}

export async function getGenres() {
  return getDrizzle().query.genres.findMany()
}

export async function addGenres(genres: Genre[]) {
  await getDrizzle().insert(schemas.genres).values(genres)
}

export async function clearGenres() {
  return getDrizzle().delete(schemas.genres)
}
