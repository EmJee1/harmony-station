import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'
import type { DbSettings } from '../types/settings'
import type {
  ContextMenuRequest,
  ContextMenuResponse,
} from '../types/context-menu'

type IpcRendererOnCallback = (
  event: IpcRendererEvent,
  arg: ContextMenuResponse
) => void

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get:settings'),
  updateSettings: (update: Partial<DbSettings>) =>
    ipcRenderer.invoke('update:settings', update),
  getAlbums: (limit: number) => ipcRenderer.invoke('get:albums', limit),
  getAlbum: (id: number) => ipcRenderer.invoke('get:album', id),
  getArtist: (id: number) => ipcRenderer.invoke('get:artist', id),
  scanTracks: () => ipcRenderer.invoke('scan-tracks'),
  checkHealth: () => ipcRenderer.invoke('check-health'),
  search: (query: string) => ipcRenderer.invoke('search', query),
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  spawnContextMenu: (args: ContextMenuRequest) =>
    ipcRenderer.invoke('spawn-context-menu', args),
  onContextMenuAction: (callback: IpcRendererOnCallback) =>
    ipcRenderer.on('context-menu-action', callback),
})
