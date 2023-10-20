import { MenuItemConstructorOptions } from 'electron'

const trackContextMenu: MenuItemConstructorOptions[] = [
  {
    label: 'Play',
    click: () => {
      console.log('Clicked the Play menu-item')
    },
  },
  {
    label: 'Add to queue',
    click: () => {
      console.log('Clicked the Add to queue menu-item')
    },
  },
]

const queueItemContextMenu: MenuItemConstructorOptions[] = [
  {
    label: 'Play',
    click: () => {
      console.log('Clicked the Play menu-item')
    },
  },
  {
    label: 'Remove from queue',
    click: () => {
      console.log('Clicked the Remove from queue menu-item')
    },
  },
]

export function getContextMenuForVersion(version: 'track' | 'queue-item') {
  switch (version) {
    case 'track':
      return trackContextMenu
    case 'queue-item':
      return queueItemContextMenu
    default:
      throw new Error(`Unknown context-menu version: "${version}"`)
  }
}
