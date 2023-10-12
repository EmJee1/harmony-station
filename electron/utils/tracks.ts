import type { IAudioMetadata } from 'music-metadata'
import { getArtistsFromTags } from './artists'
import type { Album, DbAlbum } from '../../types/albums'
import type { DbTrack, Track } from '../../types/tracks'
import type { Artist } from '../../types/artist'
import { AlbumTracks } from '../../types/album-tracks'

export function extractAlbumsFromTracks(tracks: IAudioMetadata[]) {
  const albums = tracks.map(track => track.common.album).filter(Boolean)
  const albumsWithoutDuplicates = Array.from(new Set(albums))
  return albumsWithoutDuplicates.map<Album>(album => ({ title: album }))
}

export function extractArtistsFromTracks(tracks: IAudioMetadata[]) {
  const artists = tracks.flatMap(getArtistsFromTags)
  const artistsWithoutDuplicates = Array.from(new Set(artists))
  return artistsWithoutDuplicates.map<Artist>(artist => ({ name: artist }))
}

export function extractTracksFromTracks(
  paths: string[],
  metadata: IAudioMetadata[]
) {
  return metadata.map<Track>((track, index) => {
    return {
      path: paths[index],
      title: track.common.title ?? 'Unknown title',
      genre: track.common.genre.length ? track.common.genre.at(0) : undefined,
      year: track.common.year,
    }
  })
}

export function extractAlbumTracks(
  albums: DbAlbum[],
  tracks: DbTrack[],
  meta: IAudioMetadata[]
) {
  return tracks
    .map<AlbumTracks>((track, index) => {
      const album = albums.find(album => {
        return album.title === meta[index].common.album
      })
      if (!album) {
        console.warn(`Album not found for track ${track.id}`)
        return
      }

      return {
        albumId: album.id,
        trackId: track.id,
      }
    })
    .filter(Boolean)
}
