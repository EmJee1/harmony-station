<template>
  <div class="fixed bottom-0 left-0 w-screen bg-slate-100 p-4">
    <div class="container grid grid-cols-8 items-center gap-8">
      <div v-if="currentTrack" class="col-span-2 truncate">
        {{ currentTrack.title }}
      </div>

      <div
        class="col-span-4 flex items-center gap-4"
        :class="{ 'col-span-6': !currentTrack }"
      >
        <ButtonIcon
          @click="onMainActionClick(playingStatus)"
          :disabled="
            playingStatus === PlayingStatus.Stopped ||
            playingStatus === PlayingStatus.PlayRequested
          "
        >
          <PlayIcon v-if="playingStatus === PlayingStatus.Paused" />
          <PauseIcon v-else-if="playingStatus === PlayingStatus.Playing" />
          <Spinner v-else-if="playingStatus === PlayingStatus.PlayRequested" />
          <PlayIcon v-else />
        </ButtonIcon>
        <p v-if="playingStatus === PlayingStatus.Stopped">
          Nothing is playing right now
        </p>
        <p v-else-if="playingStatus === PlayingStatus.PlayRequested">
          Loading...
        </p>
        <Seeker v-else class="w-full" />
      </div>

      <div class="col-span-2 flex items-center gap-4">
        <ButtonIcon @click="toggleMute">
          <SpeakerXMarkIcon v-if="volume === 0 || muted" />
          <SpeakerWaveIcon v-else />
        </ButtonIcon>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          @input="onVolumeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from '@heroicons/vue/24/outline/PlayIcon'
import PauseIcon from '@heroicons/vue/24/outline/PauseIcon'
import SpeakerWaveIcon from '@heroicons/vue/24/outline/SpeakerWaveIcon'
import SpeakerXMarkIcon from '@heroicons/vue/24/outline/SpeakerXMarkIcon'
import { storeToRefs } from 'pinia'
import { PlayingStatus, usePlayingStore } from '../stores/playing-store'
import ButtonIcon from './ButtonIcon.vue'
import Seeker from './Seeker.vue'
import Spinner from './Spinner.vue'

const playingStore = usePlayingStore()

const { audioElement, playingStatus, volume, muted, currentTrack } =
  storeToRefs(playingStore)
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
