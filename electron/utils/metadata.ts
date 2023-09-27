import { parseFile, selectCover } from 'music-metadata'

export async function getMetadata(path: string) {
  const metadata = await parseFile(path)

  // TODO: save cover to file
  const cover = selectCover(metadata.common.picture)

  const trackData = {
    title: metadata.common.title,
    albumArtist: metadata.common.albumartist,
    artists: metadata.common.artists,
    genre: metadata.common.genre,
    album: metadata.common.album,
    year: metadata.common.year,
    trackTotal: metadata.common.track.of,
    trackNumber: metadata.common.track.no,
  }
}
