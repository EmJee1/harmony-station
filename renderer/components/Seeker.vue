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
import { usePlayingStore } from '../stores/playing-store'

const playingStore = usePlayingStore()

function onSeekStart() {
  playingStore.audioElement.pause()
}

function onSeekEnd(e: Event) {
  const seekValue = (e.target as HTMLInputElement).valueAsNumber
  playingStore.audioElement.currentTime = seekValue
  playingStore.audioElement.play()
}
</script>
