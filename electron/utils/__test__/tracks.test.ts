import { describe, expect, test } from '@jest/globals'
import type { IAudioMetadata } from 'music-metadata'
import {
  extractAlbumArtists,
  extractAlbumsFromTracks,
  extractAlbumTracks,
  extractArtistsFromTracks,
  extractGenresFromTracks,
  extractGenreTracks,
  extractTrackArtists,
  extractTracksFromTracks,
} from '../tracks'
import type { DbAlbum } from '../../../types/albums'
import type { AlbumTracks } from '../../../types/album-tracks'
import type { DbTrack } from '../../../types/tracks'
import type { DbGenre } from '../../../types/genres'
import type { DbGenreTracks } from '../../../types/genre-tracks'

describe('tracks utils', () => {
  describe('extractArtistsFromTracks', () => {
    test.each([
      [
        [{ common: { artist: '1; 2' } }, { common: { artist: '3; 4' } }],
        [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }],
      ],
      [[{ common: { artists: ['1', '2'] } }], [{ name: '1' }, { name: '2' }]],
    ])('should return correct artists for metadata', (meta, expected) => {
      expect(extractArtistsFromTracks(meta as IAudioMetadata[])).toEqual(
        expected
      )
    })

    test('should remove duplicate artists', () => {
      const meta = {
        common: { artist: '1', albumartist: '1; 2' },
      } as IAudioMetadata
      expect(extractArtistsFromTracks([meta])).toEqual([
        { name: '1' },
        { name: '2' },
      ])
    })
  })

  describe('extractAlbumsFromTracks', () => {
    test.each([
      [
        [{ common: { album: 'a' } }, { common: { album: 'b' } }],
        [{ title: 'a' }, { title: 'b' }],
      ],
      [[{ common: { album: 'a' } }], [{ title: 'a' }]],
      [[{ common: {} }], []],
    ])('should return correct albums for metadata', (meta, expected) => {
      expect(extractAlbumsFromTracks(meta as IAudioMetadata[])).toEqual(
        expected
      )
    })
  })

  describe('extractTracksFromTracks', () => {
    test.each([
      [
        ['file-1', 'file-2'],
        [
          { common: { title: 't-a', year: 2020 } },
          { common: { title: 't-b' } },
        ],
        [
          { path: 'file-1', title: 't-a', year: 2020 },
          { path: 'file-2', title: 't-b' },
        ],
      ],
      [
        ['file-1'],
        [{ common: { genre: [] } }],
        [{ path: 'file-1', title: 'Unknown title' }],
      ],
      [[], [], []],
    ])(
      'should return the correct tracks for metadata and paths',
      (paths, meta, expected) => {
        expect(
          extractTracksFromTracks(paths, meta as IAudioMetadata[])
        ).toEqual(expected)
      }
    )
  })

  describe('extractAlbumsTracks', () => {
    test('should return the correct album_tracks', () => {
      const albums: DbAlbum[] = [
        { id: 10, title: 'a-1' },
        { id: 20, title: 'a-2' },
      ]
      const tracks: DbTrack[] = [
        { id: 1, title: '', path: '' },
        { id: 2, title: '', path: '' },
        { id: 3, title: '', path: '' },
      ]
      const meta = [
        { common: { album: 'a-1' } },
        { common: { album: 'a-1' } },
        { common: { album: 'a-2' } },
      ] as IAudioMetadata[]
      const expected: AlbumTracks[] = [
        { albumId: 10, trackId: 1 },
        { albumId: 10, trackId: 2 },
        { albumId: 20, trackId: 3 },
      ]

      expect(extractAlbumTracks(albums, tracks, meta)).toEqual(expected)
    })
  })

  describe('extractAlbumArtists', () => {
    test('should return the correct album_artists', () => {
      const albums: DbAlbum[] = [
        { id: 10, title: 'a-1' },
        { id: 20, title: 'a-2' },
      ]
      const artists = [
        { id: 1, name: 'a-1' },
        { id: 2, name: 'a-2' },
      ]
      const meta = [
        { common: { album: 'a-1', albumartist: 'a-1' } },
        { common: { album: 'a-1', albumartist: 'a-2' } },
        { common: { album: 'a-2', albumartist: 'a-2' } },
      ] as IAudioMetadata[]
      const expected = [
        { albumId: 10, artistId: 1 },
        { albumId: 10, artistId: 2 },
        { albumId: 20, artistId: 2 },
      ]

      expect(extractAlbumArtists(albums, artists, meta)).toEqual(expected)
    })
  })

  describe('extractTrackArtists', () => {
    test('should return the correct track_artists', () => {
      const tracks: DbTrack[] = [
        { id: 1, title: '', path: '' },
        { id: 2, title: '', path: '' },
        { id: 3, title: '', path: '' },
      ]
      const artists = [
        { id: 1, name: 'a-1' },
        { id: 2, name: 'a-2' },
      ]
      const meta = [
        { common: { artist: 'a-1' } },
        { common: { artist: 'a-1; a-2' } },
        { common: { artist: 'a-2' } },
      ] as IAudioMetadata[]
      const expected = [
        { trackId: 1, artistId: 1 },
        { trackId: 2, artistId: 1 },
        { trackId: 2, artistId: 2 },
        { trackId: 3, artistId: 2 },
      ]

      expect(extractTrackArtists(tracks, artists, meta)).toEqual(expected)
    })
  })

  describe('extractGenresFromTracks', () => {
    test('should return genres in track', () => {
      const meta = [
        { common: { genre: ['one; two'] } },
        { common: { genre: ['one'] } },
        { common: { genre: ['three'] } },
      ] as IAudioMetadata[]

      expect(extractGenresFromTracks(meta)).toEqual([
        { name: 'one' },
        { name: 'two' },
        { name: 'three' },
      ])
    })
  })

  describe('extractGenreTracks', () => {
    test('should return genre-tracks', () => {
      const meta = [
        { common: { genre: ['g-1; g-2'] } },
        { common: { genre: ['g-2'] } },
      ] as IAudioMetadata[]
      const tracks = [{ id: 1 }, { id: 2 }] as DbTrack[]
      const genres = [
        { id: 1, name: 'g-1' },
        { id: 2, name: 'g-2' },
      ] as DbGenre[]

      const expected: DbGenreTracks[] = [
        { trackId: 1, genreId: 1 },
        { trackId: 1, genreId: 2 },
        { trackId: 2, genreId: 2 },
      ]

      expect(extractGenreTracks(tracks, genres, meta)).toEqual(expected)
    })
  })
})
