import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Returns a reactive value indicating if the key is down.
 * Codes can be found at https://omatsuri.app/events-keycode
 * @param code
 */
export function useKeydown(code: string) {
  const isDown = ref(false)

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === code) {
      isDown.value = true
    }
  }

  function onKeyUp(e: KeyboardEvent) {
    if (e.key === code) {
      isDown.value = false
    }
  }

  onMounted(() => {
    addEventListener('keydown', onKeyDown)
    addEventListener('keyup', onKeyUp)
  })

  onUnmounted(() => {
    removeEventListener('keydown', onKeyDown)
    removeEventListener('keyup', onKeyUp)
  })

  return isDown
}
