import type { DbTrack, Track } from '../../types/tracks'
import { getDatabase } from './database'

export async function getTracks() {
  return getDatabase()('tracks')
}

export async function addTracks(tracks: Track[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('tracks', tracks, 500)
}

export async function clearTracks() {
  return getDatabase()('tracks').delete()
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
