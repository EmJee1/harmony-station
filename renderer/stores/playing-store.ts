import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { DbTrack } from '../../types/tracks'

export enum PlayingStatus {
  Stopped,
  PlayRequested,
  Playing,
  Paused,
}

export const usePlayingStore = defineStore('playing', () => {
  const currentTrack = ref<DbTrack>()
  const playingStatus = ref(PlayingStatus.Stopped)
  const audioElement = new Audio()

  audioElement.onerror = err => {
    // TODO: show user-facing error message
    console.log('Error playing audio element')
  }

  audioElement.onplay = () => {
    playingStatus.value = PlayingStatus.PlayRequested
  }

  audioElement.onplaying = () => {
    playingStatus.value = PlayingStatus.Playing
  }

  audioElement.onpause = () => {
    playingStatus.value = PlayingStatus.Paused
  }

  watch(
    () => currentTrack.value,
    async track => {
      if (!track) {
        audioElement.pause()
        audioElement.src = ''
        return
      }

      audioElement.src = encodeURI(`harmony://${track.path}`)
      await audioElement.play()
    }
  )

  return {
    audioElement,
    currentTrack,
    playingStatus,
  }
})
