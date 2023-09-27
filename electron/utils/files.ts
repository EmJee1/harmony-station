import { readdir } from 'node:fs/promises'

const ALLOWED_FILE_EXTENSIONS = ['mp3', 'flac']

export async function scanMusicFilesInFolder(path: string) {
  const files = await readdir(path, {
    recursive: true,
    withFileTypes: true,
  })

  return files.filter(file => ALLOWED_FILE_EXTENSIONS.includes(file.name))
}
