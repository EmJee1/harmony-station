import readdirp, { type ReaddirpOptions } from 'readdirp'

const TRACK_FILE_EXTENSIONS = ['mp3', 'flac']
const TRACK_SCAN_DEPTH = 5

export async function scanMusicFilesInFolder(directory: string) {
  const readdirpOptions: ReaddirpOptions = {
    fileFilter: TRACK_FILE_EXTENSIONS.map(extension => `*.${extension}`),
    depth: TRACK_SCAN_DEPTH,
  }

  const files = []
  for await (const entry of readdirp(directory, readdirpOptions)) {
    files.push(entry.fullPath)
  }

  return files
}

export async function scanMusicFilesInFolders(directories: string[]) {
  const files = []
  for (const directory of directories) {
    const filesInDirectory = await scanMusicFilesInFolder(directory)
    files.push(...filesInDirectory)
  }

  return files
}
