import { defineStore } from 'pinia'
import { useToastStore } from './toast-store'
import { useElectronRequest } from '../composables/electron-request'
import type { DbSettings } from '../../types/settings'

export const useSettingsStore = defineStore('settings', () => {
  const { registerToast } = useToastStore()
  const { execute, response: settings } = useElectronRequest('getSettings')

  async function updateSettings(update: Partial<DbSettings>) {
    if (!settings.value) {
      registerToast({
        message: 'Failed to update settings because settings are empty',
        variant: 'error',
      })
      return
    }

    settings.value = { ...settings.value, ...update }
    await window.electronAPI.updateSettings(update)
    registerToast({
      message: 'Settings saved successfully',
      variant: 'success',
      duration: 3000,
    })
  }

  return {
    settings,
    fetchSettings: execute,
    updateSettings,
  }
})
