import type { IAudioMetadata } from 'music-metadata'
import { getArtistsFromTags } from './artists'
import type { Album } from '../../types/albums'

export function extractAlbumsFromTracks(tracks: IAudioMetadata[]) {
  const albums = tracks.map(track => track.common.album).filter(Boolean)
  const albumsWithoutDuplicates = Array.from(new Set(albums))
  return albumsWithoutDuplicates.map<Album>(album => ({ title: album }))
}

export function extractArtistsFromTracks(tracks: IAudioMetadata[]) {
  const artists = tracks.flatMap(getArtistsFromTags)
  return Array.from(new Set(artists))
}
