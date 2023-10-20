import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DbSettings } from '../../types/settings'
import { useToastStore } from './toast-store'

export const useSettingsStore = defineStore('settings', () => {
  const { registerToast } = useToastStore()
  const settings = ref<DbSettings>()

  /**
   * Fetches the settings from the main process and updates the store.
   * @example
   * await fetchSettings()
   * console.log(settings.value)
   */
  async function fetchSettings() {
    settings.value = await window.electronAPI.getSettings()
  }

  async function updateSettings(update: Partial<DbSettings>) {
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
    fetchSettings,
    updateSettings,
  }
})
