import { contextBridge, ipcRenderer } from 'electron'
import { DbSettings } from '../types/settings'

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get:settings'),
  updateSettings: (update: Partial<DbSettings>) =>
    ipcRenderer.invoke('update:settings', update),
  getTracks: () => ipcRenderer.invoke('get:tracks'),
  getAlbums: (limit: number) => ipcRenderer.invoke('get:albums', limit),
  getAlbum: (id: number) => ipcRenderer.invoke('get:album', id),
  scanTracks: () => ipcRenderer.invoke('scan-tracks'),
  search: (query: string) => ipcRenderer.invoke('search', query),
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
})
