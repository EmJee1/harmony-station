import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get:settings'),
  getTracks: () => ipcRenderer.invoke('get:tracks'),
  getAlbums: () => ipcRenderer.invoke('get:albums'),
  scanTracks: () => ipcRenderer.invoke('scan-tracks'),
})
