import type { IpcRendererEvent } from 'electron'
import type { DbSettings } from '../types/settings'
import type { DbAlbum } from '../types/albums'
import type { DbArtist } from '../types/artist'
import type {
  ContextMenuRequest,
  ContextMenuResponse,
} from '../types/context-menu'
import { DbTrack } from '../types/tracks'

export interface IElectronAPI {
  getSettings: () => Promise<DbSettings>
  updateSettings: (update: Partial<DbSettings>) => Promise<void>
  getAlbums: (limit: number) => Promise<DbAlbum[]>
  getAlbum: (id: number) => Promise<Required<DbAlbum>>
  getArtist: (id: number) => Promise<Required<DbArtist>>
  scanTracks: () => Promise<void>
  search: (
    query: string
  ) => Promise<{ albums: DbAlbum[]; artists: DbArtist[]; tracks: DbTrack[] }>
  selectDirectory: () => Promise<{ filePaths: string[]; canceled: boolean }>
  spawnContextMenu: (args: ContextMenuRequest) => void
  onContextMenuAction: (
    cb: (event: IpcRendererEvent, arg: ContextMenuResponse) => unknown
  ) => unknown
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
