import type { DbSettings } from '../types/settings'
import type { DbAlbum } from '../types/albums'
import type { DbArtist } from '../types/artist'

export interface IElectronAPI {
  getSettings: () => Promise<DbSettings>
  updateSettings: (update: Partial<DbSettings>) => Promise<void>
  getAlbums: (limit: number) => Promise<DbAlbum[]>
  getAlbum: (id: number) => Promise<Required<DbAlbum>>
  getArtist: (id: number) => Promise<Required<DbArtist>>
  scanTracks: () => Promise<void>
  search: (query) => Promise<{ albums: DbAlbum[] }>
  selectDirectory: () => Promise<{ filePaths: string[]; canceled: boolean }>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
