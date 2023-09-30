import { describe, test, expect } from '@jest/globals'
import { getAlbumsFromTracks } from '../albums'

describe('albums', () => {
  describe('getAlbumsFromTracks', () => {
    test('should return empty array if no tracks', () => {
      expect(getAlbumsFromTracks([])).toEqual([])
    })

    test.each([
      [
        [
          { id: 1, album: 'a' },
          { id: 2, album: 'a' },
        ],
        [{ title: 'a', tracks: [1, 2] }],
      ],
      [
        [
          { id: 1, album: 'a' },
          { id: 2, album: 'b' },
          { id: 3, album: 'c' },
        ],
        [
          { title: 'a', tracks: [1] },
          { title: 'b', tracks: [2] },
          { title: 'c', tracks: [3] },
        ],
      ],
    ])('should return the correct albums', (tracks, expected) => {
      // @ts-expect-error - we don't care about the other properties
      expect(getAlbumsFromTracks(tracks)).toEqual(expected)
    })
  })
})
