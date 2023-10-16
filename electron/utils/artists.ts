import type { IAudioMetadata } from 'music-metadata'
import { filterDefined } from './array'

const ARTIST_TAG_SEPARATOR = '; '

export function getArtistsFromString(str: string) {
  return str.split(ARTIST_TAG_SEPARATOR)
}

export function getArtistsFromTags(track: IAudioMetadata) {
  return [
    track.common.artist,
    track.common.albumartist,
    ...(track.common.artists ?? []),
  ]
    .filter(filterDefined)
    .flatMap(artist => getArtistsFromString(artist))
}
