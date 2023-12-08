import { defineStore } from 'pinia'
import { ref } from 'vue'

interface FullscreenLoaderRegistration {
  id: symbol
  message?: string
}

/**
 * Allows registering fullscreen-loader instances.
 * Instances are created with an ID (symbol type) that can be used to unregister a specific loader.
 * The loader is rendered in the `FullscreenLoader.vue` component.
 * @example
 * const { registerFullscreenLoader, unregisterFullscreenLoader } = useFullscreenLoaderStore()
 * const TEST_LOADER = Symbol()
 *
 * registerFullscreenLoader(TEST_LOADER, 'Loading for test...')
 * unregisterFullscreenLoader(TEST_LOADER)
 */
export const useFullscreenLoaderStore = defineStore('fullscreen-loader', () => {
  const fullscreenLoaderRegistrations = ref<FullscreenLoaderRegistration[]>([])

  function registerFullscreenLoader(id: symbol, message?: string) {
    fullscreenLoaderRegistrations.value.push({ id, message })
  }

  function unregisterFullscreenLoader(id: symbol) {
    fullscreenLoaderRegistrations.value =
      fullscreenLoaderRegistrations.value.filter(registration => {
        return registration.id !== id
      })
  }

  function unregisterAllFullscreenLoaders() {
    fullscreenLoaderRegistrations.value = []
  }

  return {
    fullscreenLoaderRegistrations,
    registerFullscreenLoader,
    unregisterFullscreenLoader,
    unregisterAllFullscreenLoaders,
  }
})
