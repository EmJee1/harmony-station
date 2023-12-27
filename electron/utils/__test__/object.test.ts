import { describe, test, expect } from '@jest/globals'
import { omit, pick } from '../object'

describe('object utils', () => {
  describe('omit', () => {
    test('should return the simple object without omitted keys', () => {
      const input = {
        one: 1,
        two: 2,
        three: 3,
      }

      const expected = {
        one: 1,
        three: 3,
      }

      const result = omit(input, ['two'])

      expect(result).toEqual(expected)
    })

    test('should return the complex object without omitted keys', () => {
      const input = {
        one: { x: '1', z: '2' },
        two: [{ x: '1', z: '2' }],
        three: [{ x: { x: '1', z: '2' } }],
        four: [{ x: { x: '1', z: '2' } }],
      }

      const expected = {
        two: [{ x: '1', z: '2' }],
        three: [{ x: { x: '1', z: '2' } }],
      }

      const result = omit(input, ['one', 'four'])

      expect(result).toEqual(expected)
    })
  })

  describe('pick', () => {
    test('should return the simple object with picked keys', () => {
      const input = {
        one: 1,
        two: 2,
        three: 3,
      }

      const expected = {
        two: 2,
      }

      const result = pick(input, ['two'])

      expect(result).toEqual(expected)
    })

    test('should return the complex object with picked keys', () => {
      const input = {
        one: { x: '1', z: '2' },
        two: [{ x: '1', z: '2' }],
        three: [{ x: { x: '1', z: '2' } }],
        four: [{ x: { x: '1', z: '2' } }],
      }

      const expected = {
        two: [{ x: '1', z: '2' }],
        three: [{ x: { x: '1', z: '2' } }],
      }

      const result = pick(input, ['two', 'three'])

      expect(result).toEqual(expected)
    })
  })
})
