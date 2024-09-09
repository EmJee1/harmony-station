import { useToastStore } from '../stores/toast-store'
import { useNotificationsStore } from '../stores/notifications-store'

export function useHealthCheck() {
  const { registerToast } = useToastStore()
  const { registerHealthErrorNotification } = useNotificationsStore()

  async function checkHealth(showHealthyToast?: boolean) {
    try {
      const healthCheckResult = await window.electronAPI.checkHealth()

      if (!healthCheckResult.healthy) {
        for (const error of healthCheckResult.errors) {
          registerHealthErrorNotification(error, true)
        }

        return
      }

      if (showHealthyToast) {
        registerToast({
          variant: 'success',
          message: 'No health problems found',
        })
      }
    } catch (err) {
      registerToast({
        variant: 'error',
        message: 'Failed to get the health-check results',
      })
    }
  }

  return {
    checkHealth,
  }
}
