import { describe, expect, test } from '@jest/globals'
import { chunk } from '../array'

describe('array utils', () => {
  describe('chunk', () => {
    test.each([
      [[1, 2, 3, 4, 5], 8, [[1, 2, 3, 4, 5]]],
      [[1, 2, 3], 3, [[1, 2, 3]]],
      [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 20, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]],
    ])(
      'array with less than size should return one array',
      (arr, size, expected) => {
        expect(chunk(arr, size)).toStrictEqual(expected)
      }
    )

    test.each([
      [[1, 2, 3, 4, 5], 2, [[1, 2], [3, 4], [5]]],
      [
        [1, 2, 3, 4, 5],
        3,
        [
          [1, 2, 3],
          [4, 5],
        ],
      ],
      [[1, 2, 3, 4, 5], 4, [[1, 2, 3, 4], [5]]],
    ])(
      'array with more than size should return multiple arrays',
      (arr, size, expected) => {
        expect(chunk(arr, size)).toStrictEqual(expected)
      }
    )
  })
})
