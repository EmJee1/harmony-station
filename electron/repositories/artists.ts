import { eq } from 'drizzle-orm'
import { getDatabase, getDrizzle } from './database'
import type { Artist, DbArtist } from '../../types/artist'
import { artists } from '../schemas'

export async function getArtist(id: number) {
  return getDrizzle().query.artists.findFirst({
    where: eq(artists.id, id),
  })
}

export async function getFullArtist(id: number): Promise<DbArtist> {
  const result = await getDrizzle().query.artists.findFirst({
    where: eq(artists.id, id),
    with: {
      tracksToArtists: {
        with: {
          track: true,
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

  return {
    id: result.id,
    name: result.name,
    tracks: result.tracksToArtists.map(ta => ta.track),
    albums: result.albumsToArtists.map(aa => aa.album),
  }
}

export function getArtists() {
  return getDrizzle().query.artists.findMany()
}

export async function searchArtists(query: string, limit = 10) {
  return getDatabase()('artists').whereLike('name', `%${query}%`).limit(limit)
}

export async function addArtists(artistsToInsert: Artist[]) {
  await getDrizzle().insert(artists).values(artistsToInsert)
}

export async function clearArtists() {
  await getDrizzle().delete(artists)
}
