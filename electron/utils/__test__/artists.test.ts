import { describe, expect, test } from '@jest/globals'
import { getArtistsFromTags } from '../artists'
import { IAudioMetadata } from 'music-metadata'

describe('artists utils', () => {
  describe('getArtistsFromTags', () => {
    test('should return artist from artist tag', () => {
      const meta = { common: { artist: 'XYZ' } } as IAudioMetadata
      expect(getArtistsFromTags(meta)).toEqual(['XYZ'])
    })

    test('should return splitted artists from artist tag', () => {
      const meta = { common: { artist: 'X; Y; Z' } } as IAudioMetadata
      expect(getArtistsFromTags(meta)).toEqual(['X', 'Y', 'Z'])
    })

    test.each([
      [
        { artist: '1; 2', albumartist: '3', artists: ['4', '5; 6'] },
        ['1', '2', '3', '4', '5', '6'],
      ],
      [{ artist: '1' }, ['1']],
      [{ albumartist: '1; 2', artists: ['3'] }, ['1', '2', '3']],
    ])('should return artists from combined tags', (meta, expected) => {
      expect(
        getArtistsFromTags({ common: meta } as IAudioMetadata)
      ).toStrictEqual(expected)
    })
  })
})
