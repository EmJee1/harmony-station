import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { useToastStore } from './toast-store'
import { getToastMessageForNotification } from '../utils/notifications'
import type { Notification } from '../../types/notifications'
import type {
  AnyHealthError,
  DirNotVisibleHealthError,
} from '../../types/health'

export const useNotificationsStore = defineStore('notifications', () => {
  const { registerToast } = useToastStore()
  const notifications = ref<Notification[]>([])

  function createNotificationRegistrar<T>(
    registrar: (data: T) => Omit<Notification, 'id'>
  ) {
    return function (data: T, showToast: boolean) {
      const notification = {
        ...registrar(data),
        id: nanoid(),
      }

      notifications.value.push(notification)

      if (showToast) {
        registerToast({
          message: getToastMessageForNotification(notification),
          variant: 'error',
        })
      }
    }
  }

  const registerHealthErrorNotification = createNotificationRegistrar(
    (error: DirNotVisibleHealthError) => {
      const healthCodeToNotificationCode: Record<
        AnyHealthError['code'],
        Notification['code']
      > = {
        'dir-not-visible': 'dir-not-readable',
      }

      return {
        severity: 'error',
        code: healthCodeToNotificationCode[error.code],
        meta: error.meta,
      }
    }
  )

  function removeNotification(id: string) {
    notifications.value = notifications.value.filter(
      notification => notification.id !== id
    )
  }

  return {
    notifications,
    registerHealthErrorNotification,
    removeNotification,
  }
})
