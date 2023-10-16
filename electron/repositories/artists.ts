import { getDatabase } from './database'
import type { Artist } from '../../types/artist'
import type { DbTrack } from '../../types/tracks'

export async function getArtist(id: number) {
  return getDatabase()('artists').where({ id }).first()
}

export async function getTracksByArtist(id: number): Promise<DbTrack[]> {
  return getDatabase()('track_artists')
    .where({ artistId: id })
    .join('tracks', 'track_artists.trackId', 'tracks.id')
    .select('tracks.*')
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
