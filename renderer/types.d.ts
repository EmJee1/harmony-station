import type { Settings } from '../types/settings'
import type { DbTrack } from '../types/tracks'
import type { DbAlbum } from '../types/albums'

export interface IElectronAPI {
  getSettings: () => Promise<Settings>
  getTracks: () => Promise<DbTrack[]>
  getAlbums: (limit: number) => Promise<DbAlbum[]>
  getAlbum: (id: number) => Promise<Required<DbAlbum>>
  scanTracks: () => Promise<void>
  search: (query) => Promise<{ albums: DbAlbum[] }>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
