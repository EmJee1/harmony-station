import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Settings } from '../../types/settings'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>()

  /**
   * Fetches the settings from the main process and updates the store.
   * @example
   * await fetchSettings()
   * console.log(settings.value)
   */
  async function fetchSettings() {
    settings.value = await window.electronAPI.getSettings()
  }

  return {
    settings,
    fetchSettings,
  }
})
