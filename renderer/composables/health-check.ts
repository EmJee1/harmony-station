import { useToastStore } from '../stores/toast-store'
import type { AnyHealthError } from '../../types/health'

export function useHealthCheck() {
  const { registerToast } = useToastStore()

  /**
   * Shortens the path to prevent very long paths in error messages.
   * @example
   * const longPath = "/Volumes/music/some/very/long/path/rock"
   * // Returns /Volumes/.../rock
   * shortenPath(in)
   */
  function shortenPath(path: string) {
    const separated = path.split('/')
    if (separated.length <= 3) {
      return path
    }

    const [first, second] = separated
    const last = separated.at(-1)
    return `${first}${second}/.../${last}`
  }

  function getMessageForHealthError(healthError: AnyHealthError) {
    switch (healthError.code) {
      case 'dir-not-visible': {
        const shortPath = shortenPath(healthError.meta.path)
        return `Directory not readable: "${shortPath}"`
      }
      default:
        throw new Error(`Health error code not found`)
    }
  }

  async function checkHealth(showHealthyToast?: boolean) {
    try {
      const healthCheckResult = await window.electronAPI.checkHealth()

      if (!healthCheckResult.healthy) {
        for (const error of healthCheckResult.errors) {
          registerToast({
            variant: 'error',
            message: getMessageForHealthError(error),
          })
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
