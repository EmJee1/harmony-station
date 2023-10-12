import { getDatabase } from './database'
import type { Album } from '../../types/albums'
import type { DbTrack } from '../../types/tracks'
import type { DbArtist } from '../../types/artist'

export async function getAlbum(id: number) {
  return getDatabase()('albums').where({ id }).first()
}

export async function getTracksInAlbum(id: number): Promise<DbTrack[]> {
  return getDatabase()('album_tracks')
    .where({ albumId: id })
    .join('tracks', 'album_tracks.trackId', 'tracks.id')
    .select('tracks.*')
}

export async function getAlbumArtistsInAlbum(id: number): Promise<DbArtist[]> {
  return getDatabase()('album_artists')
    .where({ albumId: id })
    .join('artists', 'album_artists.artistId', 'artists.id')
    .select('artists.*')
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
