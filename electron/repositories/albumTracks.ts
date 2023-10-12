import { getDatabase } from './database'
import type { AlbumTracks } from '../../types/album-tracks'

export async function getAlbumTracks() {
  return getDatabase()('album_tracks')
}

export async function addAlbumTracks(albumTracks: AlbumTracks[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('album_tracks', albumTracks, 500)
}

export async function clearAlbumTracks() {
  return getDatabase()('album_tracks').delete()
}
