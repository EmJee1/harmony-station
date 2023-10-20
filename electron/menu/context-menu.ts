import { MenuItemConstructorOptions } from 'electron'

export const trackContextMenu: MenuItemConstructorOptions[] = [
  {
    label: 'Play',
    click: () => {
      console.log('Clicked the Play menu-item')
    },
  },
]
