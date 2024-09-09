import { Notification } from '../../types/notifications'
import { shortenPath } from './path'

export function getToastMessageForNotification(notification: Notification) {
  switch (notification.code) {
    case 'dir-not-readable':
      return `Directory not readable: ${shortenPath(
        notification.meta.path,
        24
      )}`
    default: {
      const _: never = notification
      throw new Error(`Unknown notification code "${_.code}"`)
    }
  }
}
