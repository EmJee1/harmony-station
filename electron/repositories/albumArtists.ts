import { getDrizzle } from './database'
import type { AlbumArtists } from '../../types/album-artists'
import * as schemas from '../schemas'

export function getAlbumArtists() {
  return getDrizzle().query.albumsToArtists.findMany()
}

export async function addAlbumArtists(albumArtists: AlbumArtists[]) {
  await getDrizzle().insert(schemas.albumsToArtists).values(albumArtists)
}

export async function clearAlbumArtists() {
  await getDrizzle().delete(schemas.albumsToArtists)
}
