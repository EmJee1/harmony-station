import { describe, expect, test } from '@jest/globals'
import { separateTagValues } from '../tag-separator'

const SEPARATOR = ';'

describe('tag-separator utils', () => {
  describe('separateTagValues', () => {
    test('single string should return the same string in an array', () => {
      expect(separateTagValues(SEPARATOR, 'test')).toEqual(['test'])
    })

    test('single array should return the same array', () => {
      expect(separateTagValues(SEPARATOR, ['test'])).toEqual(['test'])
    })

    test('multiple values should return an array with all those values', () => {
      expect(
        separateTagValues(SEPARATOR, ['one', 'two'], 'three', 'four', ['five'])
      ).toEqual(['one', 'two', 'three', 'four', 'five'])
    })

    test('single string with separator should return the separated results', () => {
      expect(separateTagValues(SEPARATOR, `one${SEPARATOR}two`)).toEqual([
        'one',
        'two',
      ])
    })

    test('single array with one item with separator should return the separated array', () => {
      expect(separateTagValues(SEPARATOR, [`one${SEPARATOR}two`])).toEqual([
        'one',
        'two',
      ])
    })

    test('multiple values with separators should return the separated values', () => {
      expect(
        separateTagValues(
          SEPARATOR,
          `one${SEPARATOR}two`,
          [`three${SEPARATOR}four${SEPARATOR}five`, `six${SEPARATOR}seven`],
          `eight${SEPARATOR}nine`
        )
      ).toEqual([
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
      ])
    })
  })
})
