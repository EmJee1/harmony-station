import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Toast {
  id: string
  message: string
  variant: 'info' | 'success' | 'error'
  duration: number
}

export const useToastStore = defineStore('toasts', () => {
  const toasts = ref<Toast[]>([])

  function registerToast(
    message: string,
    options: Partial<Omit<Toast, 'id' | 'message'>> = {}
  ) {
    const toast: Toast = {
      id: nanoid(),
      message,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 6000,
    }

    toasts.value.push(toast)

    setTimeout(() => removeToast(toast.id), toast.duration)
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return {
    toasts,
    registerToast,
  }
})
