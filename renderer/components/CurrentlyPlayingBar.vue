<template>
  <div class="fixed bottom-0 left-0 h-16 w-screen bg-slate-100">
    <Container class="grid h-full grid-cols-10 items-center gap-8">
      <div v-if="currentTrack" class="col-span-2">
        <div class="truncate">
          <Typography is="h5" variant="body" weight="medium">
            {{ currentTrack.title }}
          </Typography>
          <ArtistsLinks
            v-if="currentTrack.artists"
            :artists="currentTrack.artists"
          />
        </div>
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
        <ButtonIcon :disabled="!canSkip" @click="skip">
          <ForwardIcon />
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

      <div class="col-span-4 flex items-center justify-end gap-4">
        <ButtonIcon class="h-6 w-10" @click="cyclePlaybackRate">
          <span class="text-md">{{ playbackRate }}x</span>
        </ButtonIcon>
        <ButtonIcon is="RouterLink" to="/queue">
          <QueueListIcon />
        </ButtonIcon>
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
import ForwardIcon from '@heroicons/vue/24/outline/ForwardIcon'
import PauseIcon from '@heroicons/vue/24/outline/PauseIcon'
import PlayIcon from '@heroicons/vue/24/outline/PlayIcon'
import QueueListIcon from '@heroicons/vue/24/outline/QueueListIcon'
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
import ArtistsLinks from './ArtistsLinks.vue'

const { playingStatus, volume, muted, currentTrack, playbackRate } =
  storeToRefs(usePlayingStore())

const { toggleMute, setVolume, play, pause, skip, cyclePlaybackRate, canSkip } =
  useAudioControls()

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
