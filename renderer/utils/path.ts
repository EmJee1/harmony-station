/**
 * Shortens the path to prevent very long paths in error messages.
 * @example
 * const longPath = "/Volumes/music/some/very/long/path/rock"
 * shortenPath(in) // /Volumes/.../rock
 */
export function shortenPath(path: string, maxLength = 40) {
  if (path.length <= maxLength) {
    return path
  }

  const parts = path.split('/')
  const fileName = parts.pop() ?? ''
  const root = parts.shift() ?? ''

  const shortenedPath = `${root}/.../${fileName}`
  if (shortenedPath.length <= maxLength) {
    return shortenedPath
  }

  // If still too long, truncate the filename
  const availableSpace = maxLength - (root.length + 5) // 5 for "/.../"
  const truncatedFileName =
    fileName.length > availableSpace
      ? fileName.slice(0, availableSpace - 3) + '...'
      : fileName

  return `${root}/.../${truncatedFileName}`
}
