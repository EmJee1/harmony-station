import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Toast {
  id: string
  message: string
  variant: 'info' | 'success' | 'error'
}

interface RegisterToastProps extends Partial<Omit<Toast, 'id'>> {
  message: string
  duration?: number
}

export const useToastStore = defineStore('toasts', () => {
  const toasts = ref<Toast[]>([])

  function registerToast(options: RegisterToastProps) {
    const toast: Toast = {
      id: nanoid(),
      message: options.message,
      variant: options.variant ?? 'info',
    }

    toasts.value.push(toast)

    setTimeout(() => removeToast(toast.id), options.duration ?? 6000)
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return {
    toasts,
    registerToast,
  }
})
