import {
  parseFile,
  selectCover,
  type IAudioMetadata,
  type IPicture,
} from 'music-metadata'
import { filterDefined } from './array'

export function getCoverForTracks(files: IAudioMetadata[]) {
  const pictures = files
    .flatMap(file => file.common.picture)
    .filter(filterDefined)
  if (!pictures.length) {
    return null
  }

  return selectCover(pictures)
}

export function toBase64DataString(picture: IPicture) {
  return `data:${picture.format};base64,${picture.data.toString('base64')}`
}

export async function getMetadataForMusicFiles(paths: string[]) {
  const output = []
  for (const path of paths) {
    output.push(await parseFile(path))
  }

  return output
}
