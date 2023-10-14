import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFullscreenLoaderStore = defineStore('fullscreen-loader', () => {
  const fullscreenLoaderActive = ref(false)
  const message = ref<string | null>(null)

  function registerFullscreenLoader(msg?: string) {
    fullscreenLoaderActive.value = true
    if (msg) {
      message.value = msg
    }
  }

  function unregisterFullscreenLoader() {
    fullscreenLoaderActive.value = false
    message.value = null
  }

  return {
    message,
    fullscreenLoaderActive,
    registerFullscreenLoader,
    unregisterFullscreenLoader,
  }
})
