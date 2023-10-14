import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get:settings'),
  getTracks: () => ipcRenderer.invoke('get:tracks'),
  getAlbums: (limit: number) => ipcRenderer.invoke('get:albums', limit),
  getAlbum: (id: number) => ipcRenderer.invoke('get:album', id),
  scanTracks: () => ipcRenderer.invoke('scan-tracks'),
  search: (query: string) => ipcRenderer.invoke('search', query),
})
