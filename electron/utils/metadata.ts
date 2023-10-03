import { parseFile, selectCover } from 'music-metadata'
import type { Track } from '../../types/tracks'

export async function getMetadataForMusicFile(path: string) {
  const metadata = await parseFile(path)

  return {
    path,
    title: metadata.common.title,
    genre: metadata.common.genre.at(0),
    year: metadata.common.year,
  }
}

export async function getMetadataForMusicFiles(paths: string[]) {
  return await Promise.all(paths.map(getMetadataForMusicFile))
}
