import { getDatabase, getDrizzle } from './database'
import type { Album, DbAlbum } from '../../types/albums'
import type { DbTrack } from '../../types/tracks'
import type { DbArtist } from '../../types/artist'
import { albums } from '../schemas/schemas'

export async function getAlbum(id: number) {
  return getDrizzle().query.albums.findFirst({
    where: {
      id,
    },
  })
}

export async function getTracksInAlbum(id: number): Promise<DbTrack[]> {
  const result: (DbTrack & { artistName: string; artistId: number })[] =
    await getDatabase()('album_tracks')
      .innerJoin('tracks', 'tracks.id', 'album_tracks.trackId')
      .innerJoin('track_artists', 'track_artists.trackId', 'tracks.id')
      .innerJoin('artists', 'artists.id', 'track_artists.artistId')
      .where('album_tracks.albumId', id)
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

export async function getAlbumArtistsInAlbum(id: number): Promise<DbArtist[]> {
  return getDatabase()('album_artists')
    .where({ albumId: id })
    .join('artists', 'album_artists.artistId', 'artists.id')
    .select('artists.*')
}

export async function searchAlbums(
  query: string,
  limit = 10
): Promise<DbAlbum[]> {
  return getDatabase()('albums').whereLike('title', `%${query}%`).limit(limit)
}

export async function getAlbums(limit?: number) {
  return getDrizzle().query.albums.findMany({
    limit,
  })
}

export async function addAlbums(albumsToInsert: Album[]) {
  await getDrizzle().insert(albums).values(albumsToInsert)
}

export async function clearAlbums() {
  await getDrizzle().delete(albums)
}
