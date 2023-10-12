import type { IAudioMetadata } from 'music-metadata'
import { getArtistsFromTags } from './artists'
import type { Album } from '../../types/albums'
import type { Track } from '../../types/tracks'
import { Artist } from '../../types/artist'

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
