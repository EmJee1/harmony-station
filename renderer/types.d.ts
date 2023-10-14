import type { DbSettings } from '../types/settings'
import type { DbTrack } from '../types/tracks'
import type { DbAlbum } from '../types/albums'

export interface IElectronAPI {
  getSettings: () => Promise<DbSettings>
  updateSettings: (update: Partial<DbSettings>) => Promise<void>
  getTracks: () => Promise<DbTrack[]>
  getAlbums: (limit: number) => Promise<DbAlbum[]>
  getAlbum: (id: number) => Promise<Required<DbAlbum>>
  scanTracks: () => Promise<void>
  search: (query) => Promise<{ albums: DbAlbum[] }>
  selectDirectory: () => Promise<{ filePaths: string[]; canceled: boolean }>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
