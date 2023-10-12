import type { Settings } from '../types/settings'
import type { DbTrack } from '../types/tracks'
import type { DbAlbum } from '../types/albums'

export interface IElectronAPI {
  getSettings: () => Promise<Settings>
  getTracks: () => Promise<DbTrack[]>
  getAlbums: () => Promise<DbAlbum[]>
  getAlbum: (id: number) => Promise<{ album: DbAlbum; tracks: DbTrack[] }>
  scanTracks: () => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
