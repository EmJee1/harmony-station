import { storeToRefs } from 'pinia'
import { PlayingStatus, usePlayingStore } from '../stores/playing-store'
import { useQueueStore } from '../stores/queue-store'
import type { DbTrack } from '../../types/tracks'

export function useAudioControls() {
  const playingStore = usePlayingStore()
  const { audioElement, muted, currentTrack } = storeToRefs(playingStore)
  const { queue } = storeToRefs(useQueueStore())

  function toggleMute() {
    muted.value = !muted.value
    audioElement.value.muted = muted.value
  }

  function setVolume(volume: number) {
    audioElement.value.volume = volume
  }

  function play() {
    audioElement.value.play()
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

  function playTrack(track: DbTrack) {
    currentTrack.value = track
  }

  function addToQueue(...tracks: DbTrack[]) {
    queue.value.push(...tracks)
  }

  function clearQueue() {
    queue.value = []
  }

  return {
    toggleMute,
    setVolume,
    play,
    pause,
    skip,
    playTrack,
    addToQueue,
    clearQueue,
  }
}
