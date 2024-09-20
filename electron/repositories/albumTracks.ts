import { getDrizzle } from './database'
import type { AlbumTracks } from '../../types/album-tracks'
import * as schemas from '../schemas'

export async function getAlbumTracks() {
  return getDrizzle().query.albumsToTracks.findMany()
}

export async function addAlbumTracks(albumTracks: AlbumTracks[]) {
  await getDrizzle().insert(schemas.albumsToTracks).values(albumTracks)
}

export async function clearAlbumTracks() {
  await getDrizzle().delete(schemas.albumsToTracks)
}
