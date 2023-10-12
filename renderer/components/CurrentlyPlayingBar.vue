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
      <div>
        <p v-if="playingStatus === PlayingStatus.Stopped">
          Nothing is playing right now
        </p>
        <p v-else-if="playingStatus === PlayingStatus.PlayRequested">
          Loading...
        </p>
        <Seeker v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from '@heroicons/vue/24/outline/PlayIcon'
import PauseIcon from '@heroicons/vue/24/outline/PauseIcon'
import ArrowPathIcon from '@heroicons/vue/24/outline/ArrowPathIcon'
import { PlayingStatus, usePlayingStore } from '../stores/playing-store'
import ButtonIcon from './ButtonIcon.vue'
import Seeker from './Seeker.vue'
import { storeToRefs } from 'pinia'

const { audioElement, playingStatus } = storeToRefs(usePlayingStore())

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
</script>
