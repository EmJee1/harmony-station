<template>
  <div class="fixed bottom-0 left-0 w-screen bg-slate-100 p-4">
    <div class="container flex items-center gap-4">
      <ButtonIcon
        @click="onMainActionClick(playingStore.playingStatus)"
        :disabled="
          playingStore.playingStatus === PlayingStatus.Stopped ||
          playingStore.playingStatus === PlayingStatus.PlayRequested
        "
      >
        <PlayIcon v-if="playingStore.playingStatus === PlayingStatus.Paused" />
        <PauseIcon
          v-else-if="playingStore.playingStatus === PlayingStatus.Playing"
        />
        <ArrowPathIcon
          v-else-if="playingStore.playingStatus === PlayingStatus.PlayRequested"
        />
        <PlayIcon v-else />
      </ButtonIcon>
      <p v-if="playingStore.playingStatus === PlayingStatus.Stopped">
        Nothing is playing right now
      </p>
      <p v-else-if="playingStore.playingStatus === PlayingStatus.PlayRequested">
        Loading...
      </p>
      <input
        v-else
        type="range"
        class=""
        min="0"
        :max="playingStore.duration"
        :value="playingStore.currentTime"
        @mousedown="onSeekStart"
        @mouseup="onSeekEnd"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from '@heroicons/vue/24/outline/PlayIcon'
import PauseIcon from '@heroicons/vue/24/outline/PauseIcon'
import ArrowPathIcon from '@heroicons/vue/24/outline/ArrowPathIcon'
import { PlayingStatus, usePlayingStore } from '../stores/playing-store'
import ButtonIcon from './ButtonIcon.vue'

const playingStore = usePlayingStore()

function onMainActionClick(playingStatus: PlayingStatus) {
  switch (playingStatus) {
    case PlayingStatus.Playing:
      playingStore.audioElement.pause()
      break
    case PlayingStatus.Paused:
      playingStore.audioElement.play()
      break
  }
}

function onSeekStart() {
  playingStore.audioElement.pause()
}

function onSeekEnd(e: Event) {
  const seekValue = (e.target as HTMLInputElement).valueAsNumber
  playingStore.audioElement.currentTime = seekValue
  playingStore.audioElement.play()
}
</script>
