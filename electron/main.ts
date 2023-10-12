import path from 'node:path'
import { app, ipcMain, BrowserWindow } from 'electron'
import { getSettings } from './repositories/settings'
import { addTracks, getTracks, clearTracks } from './repositories/tracks'
import { scanMusicFilesInFolder } from './utils/files'
import { getMetadataForMusicFiles } from './utils/metadata'
import { createSchemas } from './schemas/create-schemas'
import {
  extractAlbumsFromTracks,
  extractAlbumTracks,
  extractArtistsFromTracks,
  extractTracksFromTracks,
} from './utils/tracks'
import { addArtists, clearArtists } from './repositories/artists'
import { addAlbums, clearAlbums, getAlbums } from './repositories/albums'
import { addAlbumTracks, clearAlbumTracks } from './repositories/albumTracks'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }

  mainWindow.webContents.openDevTools()
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(async () => {
  await createSchemas()

  ipcMain.handle('get:settings', getSettings)
  ipcMain.handle('get:tracks', getTracks)
  ipcMain.handle('scan-tracks', async () => {
    const settings = await getSettings()
    await Promise.all([
      clearAlbums(),
      clearAlbumTracks(),
      clearArtists(),
      clearTracks(),
    ])

    const files = await scanMusicFilesInFolder(settings.audioDirectories.at(0))
    const metadata = await getMetadataForMusicFiles(files)
    const artistNames = extractArtistsFromTracks(metadata)
    await addArtists(artistNames)
    const albumNames = extractAlbumsFromTracks(metadata)
    await addAlbums(albumNames)
    const tracks = extractTracksFromTracks(files, metadata)
    await addTracks(tracks)

    const dbAlbums = await getAlbums()
    const dbTracks = await getTracks()
    const albumTracks = extractAlbumTracks(dbAlbums, dbTracks, metadata)
    await addAlbumTracks(albumTracks)
  })

  createWindow()
})
