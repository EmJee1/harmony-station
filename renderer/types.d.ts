import type { Settings } from '../types/settings'
import type { Track } from '../types/tracks'

export interface IElectronAPI {
  getSettings: () => Promise<Settings>
  getTracks: () => Promise<Track[]>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
