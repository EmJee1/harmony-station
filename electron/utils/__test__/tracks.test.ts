import { describe, expect, test } from '@jest/globals'
import { extractAlbumsFromTracks, extractArtistsFromTracks } from '../tracks'
import { IAudioMetadata } from 'music-metadata'

describe('tracks utils', () => {
  describe('extractArtistsFromTracks', () => {
    test.each([
      [
        [{ common: { artist: '1; 2' } }, { common: { artist: '3; 4' } }],
        ['1', '2', '3', '4'],
      ],
      [[{ common: { artists: ['1', '2'] } }], ['1', '2']],
    ])('should return correct artists for metadata', (meta, expected) => {
      expect(extractArtistsFromTracks(meta as IAudioMetadata[])).toEqual(
        expected
      )
    })

    test('should remove duplicate artists', () => {
      const meta = {
        common: { artist: '1', albumartist: '1; 2' },
      } as IAudioMetadata
      expect(extractArtistsFromTracks([meta])).toEqual(['1', '2'])
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
})
