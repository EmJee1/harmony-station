import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAudioControls } from '../composables/audio-controls'
import { useToastStore } from './toast-store'
import type { DbTrack } from '../../types/tracks'

export enum PlayingStatus {
  Stopped,
  PlayRequested,
  Playing,
  Paused,
}

export const usePlayingStore = defineStore('playing', () => {
  const { skip } = useAudioControls()
  const { registerToast } = useToastStore()
  const currentTrack = ref<DbTrack | null>(null)
  const playingStatus = ref(PlayingStatus.Stopped)
  const duration = ref(0)
  const currentTime = ref(0)
  const volume = ref(1)
  const muted = ref(false)
  const playbackRate = ref(1)
  const audioElement = ref(new Audio())

  // Error during the loading of the audio
  audioElement.value.onerror = () => {
    playingStatus.value = PlayingStatus.Stopped
    registerToast({
      message: 'Something went wrong while loading the track',
      variant: 'error',
    })
  }

  audioElement.value.ontimeupdate = () => {
    currentTime.value = Math.round(audioElement.value.currentTime)
  }

  audioElement.value.onplay = () => {
    playingStatus.value = PlayingStatus.PlayRequested
  }

  audioElement.value.onplaying = () => {
    playingStatus.value = PlayingStatus.Playing
  }

  audioElement.value.onpause = () => {
    playingStatus.value = PlayingStatus.Paused
  }

  audioElement.value.ondurationchange = () => {
    duration.value = audioElement.value.duration
  }

  audioElement.value.onvolumechange = () => {
    volume.value = audioElement.value.volume
  }

  audioElement.value.onratechange = () => {
    playbackRate.value = audioElement.value.playbackRate
  }

  audioElement.value.onended = () => {
    skip()
  }

  watch(
    () => currentTrack.value,
    async track => {
      if (!track) {
        audioElement.value.pause()
        return
      }

      audioElement.value.src = encodeURI(`harmony://${track.path}`)
      await audioElement.value.play()
    }
  )

  return {
    audioElement,
    currentTrack,
    playingStatus,
    duration,
    currentTime,
    volume,
    muted,
    playbackRate,
  }
})
