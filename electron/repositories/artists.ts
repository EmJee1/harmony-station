import { eq, like } from 'drizzle-orm'
import { getDrizzle } from './database'
import type { Artist, DbArtist } from '../../types/artist'
import * as schemas from '../schemas'
import { mapQueriedArtistToArtist } from '../utils/drizzle'

export async function getArtist(id: number) {
  return getDrizzle().query.artists.findFirst({
    where: eq(schemas.artists.id, id),
  })
}

export async function getFullArtist(id: number): Promise<DbArtist> {
  const result = await getDrizzle().query.artists.findFirst({
    where: eq(schemas.artists.id, id),
    with: {
      tracksToArtists: {
        with: {
          track: {
            with: {
              tracksToArtists: {
                with: {
                  artist: true,
                },
              },
            },
          },
        },
      },
      albumsToArtists: {
        with: {
          album: true,
        },
      },
    },
  })

  if (!result) {
    return null
  }

  return mapQueriedArtistToArtist(result)
}

export function getArtists() {
  return getDrizzle().query.artists.findMany()
}

export async function searchArtists(query: string, limit = 10) {
  return getDrizzle().query.artists.findMany({
    where: like(schemas.artists.name, `%${query}%`),
    limit,
  })
}

export async function addArtists(artistsToInsert: Artist[]) {
  await getDrizzle().insert(schemas.artists).values(artistsToInsert)
}

export async function clearArtists() {
  await getDrizzle().delete(schemas.artists)
}
