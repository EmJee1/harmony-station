<template>
  <div class="fixed bottom-0 left-0 z-10 w-screen bg-slate-100 py-4">
    <Container class="grid grid-cols-8 items-center gap-8">
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
        <Typography
          v-if="playingStatus === PlayingStatus.Stopped"
          is="p"
          variant="body"
        >
          Nothing is playing right now
        </Typography>
        <Typography
          v-else-if="playingStatus === PlayingStatus.PlayRequested"
          is="p"
          variant="body"
        >
          Loading...
        </Typography>
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
    </Container>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from '@heroicons/vue/24/outline/PlayIcon'
import PauseIcon from '@heroicons/vue/24/outline/PauseIcon'
import SpeakerWaveIcon from '@heroicons/vue/24/outline/SpeakerWaveIcon'
import SpeakerXMarkIcon from '@heroicons/vue/24/outline/SpeakerXMarkIcon'
import { storeToRefs } from 'pinia'
import ButtonIcon from './ButtonIcon.vue'
import Container from './Container.vue'
import Seeker from './Seeker.vue'
import Spinner from './Spinner.vue'
import Typography from './Typography.vue'
import { useAudioControls } from '../composables/audio-controls'
import { PlayingStatus, usePlayingStore } from '../stores/playing-store'

const { playingStatus, volume, muted, currentTrack } = storeToRefs(
  usePlayingStore()
)

const { toggleMute, setVolume, play, pause } = useAudioControls()

function onMainActionClick(playingStatus: PlayingStatus) {
  switch (playingStatus) {
    case PlayingStatus.Playing:
      pause()
      break
    case PlayingStatus.Paused:
      play()
      break
  }
}

function onVolumeChange(e: Event) {
  const newVolume = (e.target as HTMLInputElement).valueAsNumber
  setVolume(newVolume)
}
</script>
