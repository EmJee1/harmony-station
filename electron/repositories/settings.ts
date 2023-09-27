import type { Settings } from '../../types/settings'

export async function getSettings(): Promise<Settings> {
  return {
    audioDirectories: [],
  }
}
