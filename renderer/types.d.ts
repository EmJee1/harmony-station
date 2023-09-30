import type { Settings } from '../types/settings'
import type { Track } from '../types/tracks'
import type { Album } from '../types/albums'

export interface IElectronAPI {
  getSettings: () => Promise<Settings>
  getTracks: () => Promise<Track[]>
  getAlbums: () => Promise<Album[]>
  scanTracks: () => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
