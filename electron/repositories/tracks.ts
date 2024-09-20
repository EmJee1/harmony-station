import { like } from 'drizzle-orm'
import type { DbTrack, Track } from '../../types/tracks'
import { getDrizzle } from './database'
import * as schemas from '../schemas'

export async function getTracks() {
  return getDrizzle().query.tracks.findMany()
}

export async function addTracks(tracksToInsert: Track[]) {
  await getDrizzle().insert(schemas.tracks).values(tracksToInsert)
}

export async function clearTracks() {
  await getDrizzle().delete(schemas.tracks)
}

export async function searchTracks(
  query: string,
  limit = 10
): Promise<DbTrack[]> {
  const tracks = await getDrizzle().query.tracks.findMany({
    limit,
    where: like(schemas.tracks.title, `%${query}%`),
    with: {
      albumsToTracks: {
        with: {
          album: true,
        },
      },
    },
  })

  return tracks.map(t => ({
    id: t.id,
    path: t.path,
    title: t.title,
    year: t.year,
    album: t.albumsToTracks.at(0)?.album,
  }))
}
