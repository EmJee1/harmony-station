import type { Settings } from '../../types/settings'

export async function getSettings(): Promise<Settings> {
  return {
    audioDirectories: ['/Volumes/Elements/Music/New/Hardcore'],
  }
}
