<template>
  <input
    type="range"
    class=""
    min="0"
    :max="playingStore.duration"
    :value="playingStore.currentTime"
    @mousedown="onSeekStart"
    @mouseup="onSeekEnd"
  />
</template>

<script setup lang="ts">
import { useAudioControls } from '../composables/audio-controls'
import { usePlayingStore } from '../stores/playing-store'

const { play, pause, setCurrentTime } = useAudioControls()
const playingStore = usePlayingStore()

function onSeekStart() {
  pause()
}

function onSeekEnd(e: Event) {
  const seekValue = (e.target as HTMLInputElement).valueAsNumber
  setCurrentTime(seekValue)
  play()
}
</script>
