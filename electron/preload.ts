import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get:settings'),
  getTracks: () => ipcRenderer.invoke('get:tracks'),
  getAlbums: () => ipcRenderer.invoke('get:albums'),
  getAlbum: (id: number) => ipcRenderer.invoke('get:album', id),
  scanTracks: () => ipcRenderer.invoke('scan-tracks'),
})
