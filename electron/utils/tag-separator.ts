import { filterDefined } from './array'

type TagValue = string | string[] | undefined | null

export const ARTIST_TAG_SEPARATOR = '; '
export const GENRE_TAG_SEPARATOR = '; '

export function separateTagValues(separator: string, ...tagValues: TagValue[]) {
  const flatTagValues = tagValues.flat().filter(filterDefined)
  return flatTagValues.flatMap(value => value.split(separator))
}
