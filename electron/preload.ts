import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get:settings'),
  getTracks: () => ipcRenderer.invoke('get:tracks'),
})
