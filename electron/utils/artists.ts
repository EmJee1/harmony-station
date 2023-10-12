import type { IAudioMetadata } from 'music-metadata'

const ARTIST_TAG_SEPARATOR = '; '

export function getArtistsFromString(str: string) {
  return str.split(ARTIST_TAG_SEPARATOR)
}

export function getArtistsFromTags(track: IAudioMetadata) {
  return [
    track.common.artist,
    track.common.albumartist,
    ...(track.common.artists || []),
  ]
    .filter(Boolean)
    .flatMap(getArtistsFromString)
}
