import { describe, test, expect } from '@jest/globals'
import { groupBy } from '../data-aggregation'

describe('data aggregation utils', () => {
  describe('aggregate', () => {
    test('should return the aggregated data for a simple structure', () => {
      const input = [
        { trackId: 1, artistName: 'an-1' },
        { trackId: 2, artistName: 'an-1' },
        { trackId: 2, artistName: 'an-2' },
      ]

      const expected = [
        {
          trackId: 1,
          artists: [{ artistName: 'an-1' }],
        },
        {
          trackId: 2,
          artists: [{ artistName: 'an-1' }, { artistName: 'an-2' }],
        },
      ]

      const result = groupBy(input, 'trackId', 'artists', ['artistName'])

      expect(result).toStrictEqual(expected)
    })

    test('should return the aggregated data for a complex structure', () => {
      const input = [
        { trackId: 1, trackName: 't-1', artistName: 'an-1', artistId: 1 },
        { trackId: 1, trackName: 't-1', artistName: 'an-2', artistId: 2 },
        { trackId: 2, trackName: 't-2', artistName: 'an-1', artistId: 1 },
        { trackId: 2, trackName: 't-2', artistName: 'an-2', artistId: 2 },
        { trackId: 2, trackName: 't-2', artistName: 'an-3', artistId: 3 },
        { trackId: 3, trackName: 't-3', artistName: 'an-1', artistId: 1 },
      ]

      const expected = [
        {
          trackId: 1,
          trackName: 't-1',
          artists: [
            { artistName: 'an-1', artistId: 1 },
            { artistName: 'an-2', artistId: 2 },
          ],
        },
        {
          trackId: 2,
          trackName: 't-2',
          artists: [
            { artistName: 'an-1', artistId: 1 },
            { artistName: 'an-2', artistId: 2 },
            { artistName: 'an-3', artistId: 3 },
          ],
        },
        {
          trackId: 3,
          trackName: 't-3',
          artists: [{ artistName: 'an-1', artistId: 1 }],
        },
      ]

      const result = groupBy(input, 'trackId', 'artists', [
        'artistName',
        'artistId',
      ])

      expect(result).toStrictEqual(expected)
    })
  })
})
