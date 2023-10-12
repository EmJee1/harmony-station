import { getDatabase } from './database'
import type { AlbumArtists } from '../../types/album-artists'

export async function getAlbumArtists() {
  return getDatabase()('album_artists')
}

export async function addAlbumArtists(albumArtists: AlbumArtists[]) {
  // https://knexjs.org/guide/utility.html#batchinsert
  return getDatabase().batchInsert('album_artists', albumArtists, 500)
}

export async function clearAlbumArtists() {
  return getDatabase()('album_artists').delete()
}
