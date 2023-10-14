import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DbSettings } from '../../types/settings'

export const useSettingsStore = defineStore('settings', () => {
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
    // TODO: success notification
  }

  return {
    settings,
    fetchSettings,
    updateSettings,
  }
})
