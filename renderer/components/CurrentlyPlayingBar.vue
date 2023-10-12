<template>
  <div class="fixed bottom-0 left-0 w-screen bg-slate-100 p-4">
    <div class="container flex items-center gap-4">
      <ButtonIcon
        @click="onMainActionClick(playingStatus)"
        :disabled="
          playingStatus === PlayingStatus.Stopped ||
          playingStatus === PlayingStatus.PlayRequested
        "
      >
        <PlayIcon v-if="playingStatus === PlayingStatus.Paused" />
        <PauseIcon v-else-if="playingStatus === PlayingStatus.Playing" />
        <ArrowPathIcon
          v-else-if="playingStatus === PlayingStatus.PlayRequested"
        />
        <PlayIcon v-else />
      </ButtonIcon>
      <div class="w-full">
        <p v-if="playingStatus === PlayingStatus.Stopped">
          Nothing is playing right now
        </p>
        <p v-else-if="playingStatus === PlayingStatus.PlayRequested">
          Loading...
        </p>
        <Seeker v-else class="w-full" />
      </div>
      <ButtonIcon @click="toggleMute">
        <SpeakerXMarkIcon v-if="volume === 0 || muted" />
        <SpeakerWaveIcon v-else />
      </ButtonIcon>
      <input type="range" min="0" max="1" step="0.05" @input="onVolumeChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from '@heroicons/vue/24/outline/PlayIcon'
import PauseIcon from '@heroicons/vue/24/outline/PauseIcon'
import ArrowPathIcon from '@heroicons/vue/24/outline/ArrowPathIcon'
import SpeakerWaveIcon from '@heroicons/vue/24/outline/SpeakerWaveIcon'
import SpeakerXMarkIcon from '@heroicons/vue/24/outline/SpeakerXMarkIcon'
import { storeToRefs } from 'pinia'
import { PlayingStatus, usePlayingStore } from '../stores/playing-store'
import ButtonIcon from './ButtonIcon.vue'
import Seeker from './Seeker.vue'

const playingStore = usePlayingStore()

const { audioElement, playingStatus, volume, muted } = storeToRefs(playingStore)
const { toggleMute } = playingStore

function onMainActionClick(playingStatus: PlayingStatus) {
  switch (playingStatus) {
    case PlayingStatus.Playing:
      audioElement.value.pause()
      break
    case PlayingStatus.Paused:
      audioElement.value.play()
      break
  }
}

function onVolumeChange(e: Event) {
  const newVolume = (e.target as HTMLInputElement).valueAsNumber
  audioElement.value.volume = newVolume
}
</script>
