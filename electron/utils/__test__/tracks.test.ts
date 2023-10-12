import { describe, expect, test } from '@jest/globals'
import type { IAudioMetadata } from 'music-metadata'
import {
  extractAlbumsFromTracks,
  extractAlbumTracks,
  extractArtistsFromTracks,
  extractTracksFromTracks,
} from '../tracks'
import type { DbAlbum } from '../../../types/albums'
import type { AlbumTracks } from '../../../types/album-tracks'
import type { DbTrack } from '../../../types/tracks'

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
          { common: { title: 't-a', year: 2020, genre: ['g-a', 'g-b'] } },
          { common: { title: 't-b', genre: [] } },
        ],
        [
          { path: 'file-1', title: 't-a', genre: 'g-a', year: 2020 },
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
})