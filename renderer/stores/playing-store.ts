import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { DbTrack } from '../../types/tracks'

export const usePlayingStore = defineStore('playing', () => {
  const currentTrack = ref<DbTrack>()
  const audioElement = new Audio()

  audioElement.onerror = err => {
    // TODO: show user-facing error message
    console.log('Error playing audio element')
  }

  watch(
    () => currentTrack.value,
    async track => {
      if (!track) {
        audioElement.pause()
        audioElement.src = ''
        return
      }

      audioElement.src = `harmony://${track.path}`
      audioElement.oncanplaythrough = async () => {
        await audioElement.play()
      }
    }
  )

  return {
    currentTrack,
  }
})
