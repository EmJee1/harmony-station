import { getDatabase } from './database'
import type { Artist } from '../../types/artist'
import type { DbTrack } from '../../types/tracks'

export async function getArtist(id: number) {
  return getDatabase()('artists').where({ id }).first()
}

export async function getTracksByArtist(id: number): Promise<DbTrack[]> {
  const result: (DbTrack & { artistName: string; artistId: number })[] =
    await getDatabase()('track_artists')
      .innerJoin('tracks', 'tracks.id', 'track_artists.trackId')
      .innerJoin('artists', 'artists.id', 'track_artists.artistId')
      .whereIn('trackId', builder => {
        void builder
          .select('trackId')
          .from('track_artists')
          .where('artistId', id)
      })
      .select('tracks.*', {
        artistId: 'artists.id',
        artistName: 'artists.name',
      })

  return result.reduce<DbTrack[]>((acc, currentValue) => {
    const { artistName, artistId, ...rest } = currentValue
    let currentIndex = acc.findIndex(track => track.id === rest.id)
    if (currentIndex === -1) {
      currentIndex = acc.push({ ...rest, artists: [] }) - 1
    }

    acc[currentIndex].artists!.push({
      name: artistName,
      id: artistId,
    })

    return acc
  }, [])
}

export async function getArtists() {
  return getDatabase()('artists')
}

export async function searchArtists(query: string, limit = 10) {
  return getDatabase()('artists').whereLike('name', `%${query}%`).limit(limit)
}

export async function addArtists(artists: Artist[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('artists', artists, 500)
}

export async function clearArtists() {
  return getDatabase()('artists').delete()
}
