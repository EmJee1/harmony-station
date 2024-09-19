import type { DbTrack, Track } from '../../types/tracks'
import { getDatabase, getDrizzle } from './database'
import { tracks } from '../schemas'

export async function getTracks() {
  return getDrizzle().query.tracks.findMany()
}

export async function addTracks(tracksToInsert: Track[]) {
  await getDrizzle().insert(tracks).values(tracksToInsert)
}

export async function clearTracks() {
  await getDrizzle().delete(tracks)
}

export async function searchTracks(
  query: string,
  limit = 10
): Promise<DbTrack[]> {
  const tracks = (await getDatabase()('tracks')
    .whereLike('tracks.title', `%${query}%`)
    .innerJoin('album_tracks', 'album_tracks.trackId', 'tracks.id')
    .innerJoin('albums', 'albums.id', 'album_tracks.albumId')
    .select('tracks.*', {
      albumId: 'albums.id',
      albumTitle: 'albums.title',
    })
    .limit(limit)) as (DbTrack & { albumId: number; albumTitle: string })[]

  return tracks.map<DbTrack>(track => {
    const { albumId, albumTitle, ...trackRest } = track
    return {
      ...trackRest,
      album: {
        id: albumId,
        title: albumTitle,
      },
    }
  })
}
