import { parseFile, selectCover } from 'music-metadata'
import type { Track } from '../../types/tracks'

const ARTIST_TAG_SEPARATOR = '; '

export async function getMetadataForMusicFile(path: string): Promise<Track> {
  const metadata = await parseFile(path)

  // TODO: save cover to file
  const cover = selectCover(metadata.common.picture)

  const artists = metadata.common.artists.flatMap(artist => {
    return artist.split(ARTIST_TAG_SEPARATOR)
  })
  const trackTotal = metadata.common.totaltracks
    ? Number(metadata.common.totaltracks)
    : metadata.common.track.of

  return {
    path,
    title: metadata.common.title,
    albumArtist: metadata.common.albumartist,
    artists,
    genre: metadata.common.genre,
    album: metadata.common.album,
    year: metadata.common.year,
    trackTotal,
    trackNumber: metadata.common.track.no,
  }
}

export async function getMetadataForMusicFiles(paths: string[]) {
  return await Promise.all(paths.map(getMetadataForMusicFile))
}
