import { eq, like } from 'drizzle-orm'
import { getDrizzle } from './database'
import type { Album, DbAlbum } from '../../types/albums'
import { mapQueriedAlbumToAlbum } from '../utils/drizzle'
import * as schemas from '../schemas'

export async function getAlbum(id: number) {
  return getDrizzle().query.albums.findFirst({
    where: eq(schemas.albums.id, id),
  })
}

export async function getFullAlbum(id: number): Promise<DbAlbum | null> {
  const album = await getDrizzle().query.albums.findFirst({
    where: eq(schemas.albums.id, id),
    with: {
      albumsToTracks: {
        with: {
          track: {
            with: {
              tracksToArtists: {
                with: {
                  artist: true,
                },
              },
              genresToTracks: {
                with: {
                  genre: true,
                },
              },
            },
          },
        },
      },
      albumsToArtists: {
        with: {
          artist: true,
        },
      },
    },
  })

  if (!album) {
    return null
  }

  return mapQueriedAlbumToAlbum(album)
}

export async function searchAlbums(
  query: string,
  limit = 10
): Promise<DbAlbum[]> {
  return getDrizzle().query.albums.findMany({
    where: like(schemas.albums.title, `%${query}%`),
    limit,
  })
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
