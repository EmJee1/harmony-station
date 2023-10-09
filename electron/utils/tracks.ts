import type { IAudioMetadata } from 'music-metadata'
import { getArtistsFromTags } from './artists'

export function extractArtistsFromTracks(tracks: IAudioMetadata[]) {
  const artists = tracks.flatMap(getArtistsFromTags)
  return Array.from(new Set(artists))
}
