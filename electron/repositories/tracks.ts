import { Track } from '../../types/tracks'

export async function getTracks(): Promise<Track[]> {
  return [
    {
      id: '1',
      path: '/home/alex/Music/01 - The Beatles - Come Together.mp3',
      title: 'Come Together',
      albumArtist: 'The Beatles',
      artists: ['The Beatles'],
      genre: 'Rock',
      album: 'Abbey Road',
      year: 1969,
      trackTotal: 17,
      trackNumber: 1,
    },
  ]
}
