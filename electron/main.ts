import path from 'node:path'
import {
  app,
  ipcMain,
  protocol,
  BrowserWindow,
  dialog,
  Menu,
  type IpcMainInvokeEvent,
} from 'electron'
import { getSettings, updateSettings } from './repositories/settings'
import {
  addTracks,
  getTracks,
  clearTracks,
  searchTracks,
} from './repositories/tracks'
import { scanMusicFilesInFolders } from './utils/files'
import { getMetadataForMusicFiles } from './utils/metadata'
import { createSchemas } from './schemas/create-schemas'
import {
  extractAlbumArtists,
  extractAlbumsFromTracks,
  extractAlbumTracks,
  extractArtistsFromTracks,
  extractGenresFromTracks,
  extractGenreTracks,
  extractTrackArtists,
  extractTracksFromTracks,
} from './utils/tracks'
import {
  addArtists,
  clearArtists,
  getArtists,
  getFullArtist,
  searchArtists,
} from './repositories/artists'
import {
  addAlbums,
  clearAlbums,
  getAlbums,
  getFullAlbum,
  searchAlbums,
} from './repositories/albums'
import { addAlbumTracks, clearAlbumTracks } from './repositories/albumTracks'
import { harmonyProtocolHandler } from './protocols/harmony-protocol'
import { addAlbumArtists, clearAlbumArtists } from './repositories/albumArtists'
import { addTrackArtists, clearTrackArtists } from './repositories/trackArtists'
import { DbSettings } from '../types/settings'
import { getContextMenuForVersion } from './menu/context-menu'
import { ContextMenuRequest } from '../types/context-menu'
import { addGenres, clearGenres, getGenres } from './repositories/genres'
import { addGenreTracks, clearGenreTracks } from './repositories/genreTracks'
import type { AnyHealthError, CheckHealthResult } from '../types/health'
import {
  directoryDoesNotExistHealthError,
  directoryExists,
} from './utils/health'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    minWidth: 768, // TailwindCSS md breakpoint
    width: 800,
    height: 600,
    title: 'Harmony Station',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    void mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    void mainWindow.loadFile(
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

app
  .whenReady()
  .then(async () => {
    await createSchemas()

    ipcMain.handle('get:settings', getSettings)
    ipcMain.handle(
      'update:settings',
      (_: IpcMainInvokeEvent, update: Partial<DbSettings>) => {
        return updateSettings(update)
      }
    )
    ipcMain.handle('get:albums', (_: IpcMainInvokeEvent, limit: number) => {
      return getAlbums(limit)
    })
    ipcMain.handle('get:album', async (_: IpcMainInvokeEvent, id: number) => {
      return getFullAlbum(id)
    })
    ipcMain.handle('get:artist', (_: IpcMainInvokeEvent, id: number) => {
      return getFullArtist(id)
    })
    ipcMain.handle('scan-tracks', async () => {
      const settings = await getSettings()
      await Promise.all([
        clearAlbumArtists(),
        clearAlbumTracks(),
        clearGenreTracks(),
        clearTrackArtists(),
        clearAlbums(),
        clearGenres(),
        clearArtists(),
        clearTracks(),
      ])

      const files = await scanMusicFilesInFolders(settings.audioDirectories)
      const metadata = await getMetadataForMusicFiles(files)
      const artistNames = extractArtistsFromTracks(metadata)
      await addArtists(artistNames)
      const albumNames = extractAlbumsFromTracks(metadata)
      await addAlbums(albumNames)
      const tracks = extractTracksFromTracks(files, metadata)
      await addTracks(tracks)
      const genres = extractGenresFromTracks(metadata)
      await addGenres(genres)

      const dbAlbums = await getAlbums()
      const dbTracks = await getTracks()
      const dbArtists = await getArtists()
      const dbGenres = await getGenres()

      const albumTracks = extractAlbumTracks(dbAlbums, dbTracks, metadata)
      await addAlbumTracks(albumTracks)

      const albumArtists = extractAlbumArtists(dbAlbums, dbArtists, metadata)
      await addAlbumArtists(albumArtists)

      const trackArtists = extractTrackArtists(dbTracks, dbArtists, metadata)
      await addTrackArtists(trackArtists)

      const genreTracks = extractGenreTracks(dbTracks, dbGenres, metadata)
      await addGenreTracks(genreTracks)
    })
    ipcMain.handle('check-health', async (): Promise<CheckHealthResult> => {
      // Checks if the application is in a state to function optimally
      const settings = await getSettings()
      const healthErrors: AnyHealthError[] = []

      for (const audioDirectory of settings.audioDirectories) {
        const exists = await directoryExists(audioDirectory)
        if (!exists) {
          healthErrors.push(directoryDoesNotExistHealthError(audioDirectory))
        }
      }

      if (!healthErrors.length) {
        return {
          healthy: true,
        }
      }

      return {
        healthy: false,
        errors: healthErrors,
      }
    })
    ipcMain.handle('search', async (_: IpcMainInvokeEvent, query: string) => {
      return {
        albums: await searchAlbums(query, 6),
        artists: await searchArtists(query, 6),
        tracks: await searchTracks(query, 6),
      }
    })
    ipcMain.handle('select-directory', async () => {
      return dialog.showOpenDialog({
        properties: ['openDirectory'],
      })
    })
    ipcMain.handle(
      'spawn-context-menu',
      (event: IpcMainInvokeEvent, args: ContextMenuRequest) => {
        const window = BrowserWindow.fromWebContents(event.sender)
        if (!window) {
          return
        }

        const menuVersion = getContextMenuForVersion(window, args)
        const menu = Menu.buildFromTemplate(menuVersion)
        menu.popup({ window })
      }
    )

    // TODO: update to protocol.handle because registerFileProtocol is deprecated
    // https://www.electronjs.org/docs/latest/breaking-changes#planned-breaking-api-changes-250
    protocol.registerFileProtocol('harmony', harmonyProtocolHandler)

    createWindow()
  })
  .catch(console.error)
