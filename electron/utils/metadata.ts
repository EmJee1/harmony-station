import { parseFile, selectCover } from 'music-metadata'
import type { Track } from '../../types/tracks'

export async function getMetadataForMusicFile(path: string) {
  return parseFile(path)
}

export async function getMetadataForMusicFiles(paths: string[]) {
  return await Promise.all(paths.map(getMetadataForMusicFile))
}
