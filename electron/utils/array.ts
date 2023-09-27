/**
 * Split an array into chunks of a given size
 * @param array The array to split
 * @param size The size of each chunk
 */
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  )
}
