import type { Settings } from '../types/settings'
import type { Track } from '../types/tracks'

export interface IElectronAPI {
  getSettings: () => Promise<Settings>
  getTracks: () => Promise<Track[]>
  scanTracks: () => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
