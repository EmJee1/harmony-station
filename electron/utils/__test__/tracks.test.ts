import { describe, expect, test } from '@jest/globals'
import {
  extractAlbumsFromTracks,
  extractArtistsFromTracks,
  extractTracksFromTracks,
} from '../tracks'
import { IAudioMetadata } from 'music-metadata'

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
})
