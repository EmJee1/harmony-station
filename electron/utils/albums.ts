import type { DbTrack } from '../../types/tracks'
import type { Album } from '../../types/albums'

export function getAlbumsFromTracks(tracks: DbTrack[]) {
  const albums = tracks.reduce<Record<string, Album>>((acc, current) => {
    if (!current.album) {
      return acc
    }

    if (!acc[current.album]) {
      acc[current.album] = {
        title: current.album,
        tracks: [],
      }
    }

    acc[current.album].tracks.push(current.id)
    return acc
  }, {})

  return Object.values(albums)
}
