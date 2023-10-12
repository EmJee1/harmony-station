import { getDatabase } from './database'
import type { Album } from '../../types/albums'
import { DbTrack } from '../../types/tracks'

export async function getAlbum(id: number) {
  return getDatabase()('albums').where({ id }).first()
}

export async function getTracksInAlbum(id: number): Promise<DbTrack[]> {
  return getDatabase()('album_tracks')
    .where({ albumId: id })
    .join('tracks', 'album_tracks.trackId', 'tracks.id')
    .select('tracks.*')
}

export async function getAlbums() {
  return getDatabase()('albums')
}

export async function addAlbums(albums: Album[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('albums', albums, 500)
}

export async function clearAlbums() {
  return getDatabase()('albums').delete()
}
