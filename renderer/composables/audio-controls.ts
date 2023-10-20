import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { PlayingStatus, usePlayingStore } from '../stores/playing-store'
import { useQueueStore } from '../stores/queue-store'
import { useToastStore } from '../stores/toast-store'
import type { DbTrack } from '../../types/tracks'

export function useAudioControls() {
  const playingStore = usePlayingStore()
  const { audioElement, muted, currentTrack } = storeToRefs(playingStore)
  const { queue } = storeToRefs(useQueueStore())
  const { registerToast } = useToastStore()

  function toggleMute() {
    muted.value = !muted.value
    audioElement.value.muted = muted.value
  }

  function setVolume(volume: number) {
    audioElement.value.volume = volume
  }

  function play() {
    void audioElement.value.play()
  }

  function pause() {
    audioElement.value.pause()
  }

  function skip() {
    const nextTrack = queue.value.shift()
    if (nextTrack) {
      playingStore.currentTrack = nextTrack
      return
    }

    playingStore.playingStatus = PlayingStatus.Stopped
    playingStore.currentTrack = null
  }

  function playQueueTrack(track: DbTrack) {
    const queueIndex = queue.value.findIndex(item => item.id === track.id)
    if (queueIndex === -1) {
      registerToast({
        message: 'Failed play track from queue because it is not in the queue',
        variant: 'error',
      })
      return
    }

    queue.value.splice(0, queueIndex + 1)
    playTrack(track)
  }

  function removeTrackFromQueue(track: DbTrack) {
    const queueIndex = queue.value.findIndex(item => item.id === track.id)
    if (queueIndex === -1) {
      registerToast({
        message: 'Failed play remove track because it is not in the queue',
        variant: 'error',
      })
      return
    }

    queue.value.splice(queueIndex, 1)
  }

  function playTrack(track: DbTrack) {
    currentTrack.value = track
  }

  function addToQueue(...tracks: DbTrack[]) {
    queue.value.push(...tracks)
  }

  function clearQueue() {
    queue.value = []
  }

  function setCurrentTime(time: number) {
    audioElement.value.currentTime = time
  }

  const canSkip = computed(() => queue.value.length > 0)

  return {
    toggleMute,
    setVolume,
    play,
    pause,
    skip,
    playQueueTrack,
    removeTrackFromQueue,
    playTrack,
    addToQueue,
    clearQueue,
    setCurrentTime,
    canSkip,
  }
}
