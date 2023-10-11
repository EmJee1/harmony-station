import { getDatabase } from './database'
import type { Album } from '../../types/albums'

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
