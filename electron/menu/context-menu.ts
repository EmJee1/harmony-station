import type { BrowserWindow, MenuItemConstructorOptions } from 'electron'
import type {
  ContextMenuRequest,
  QueueItemContextMenuResponse,
  TrackContextMenuResponse,
} from '../../types/context-menu'

function getTrackContextMenu(
  browserWindow: BrowserWindow,
  args: ContextMenuRequest
): MenuItemConstructorOptions[] {
  return [
    {
      label: 'Play',
      click: () => {
        const arg: TrackContextMenuResponse = {
          version: 'track',
          track: args.track,
          option: 'play',
        }

        browserWindow.webContents.send('context-menu-action', arg)
      },
    },
    {
      label: 'Add to queue',
      click: () => {
        const arg: TrackContextMenuResponse = {
          version: 'track',
          track: args.track,
          option: 'add-to-queue',
        }

        browserWindow.webContents.send('context-menu-action', arg)
      },
    },
  ]
}

function getQueueItemContextMenu(
  browserWindow: BrowserWindow,
  args: ContextMenuRequest
): MenuItemConstructorOptions[] {
  return [
    {
      label: 'Play',
      click: () => {
        const arg: QueueItemContextMenuResponse = {
          version: 'queue-item',
          track: args.track,
          option: 'play',
        }

        browserWindow.webContents.send('context-menu-action', arg)
      },
    },
    {
      label: 'Remove from queue',
      click: () => {
        const arg: QueueItemContextMenuResponse = {
          version: 'queue-item',
          track: args.track,
          option: 'remove-from-queue',
        }

        browserWindow.webContents.send('context-menu-action', arg)
      },
    },
  ]
}

export function getContextMenuForVersion(
  browserWindow: BrowserWindow,
  args: ContextMenuRequest
) {
  switch (args.version) {
    case 'track':
      return getTrackContextMenu(browserWindow, args)
    case 'queue-item':
      return getQueueItemContextMenu(browserWindow, args)
    default:
      throw new Error(`Unknown context-menu version`)
  }
}
