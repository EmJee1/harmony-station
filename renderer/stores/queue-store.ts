import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DbTrack } from '../../types/tracks'

export const useQueueStore = defineStore('queue', () => {
  const queue = ref<DbTrack[]>([])

  return {
    queue,
  }
})
