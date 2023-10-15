<template>
  <ButtonIcon @click="onClick">
    <PlayIcon
      v-if="
        !isCurrentTrack ||
        playingStatus === PlayingStatus.Stopped ||
        (isCurrentTrack && playingStatus === PlayingStatus.Paused)
      "
    />
    <PauseIcon
      v-else-if="isCurrentTrack && playingStatus === PlayingStatus.Playing"
    />
    <Spinner
      v-else-if="
        isCurrentTrack && playingStatus === PlayingStatus.PlayRequested
      "
    />
  </ButtonIcon>
</template>

<script setup lang="ts">
import PlayIcon from '@heroicons/vue/24/outline/PlayIcon'
import PauseIcon from '@heroicons/vue/24/outline/PauseIcon'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import ButtonIcon from './ButtonIcon.vue'
import { PlayingStatus, usePlayingStore } from '../stores/playing-store'
import { DbTrack } from '../../types/tracks'
import Spinner from './Spinner.vue'

const props = defineProps<{
  track: DbTrack
}>()

const playingStore = usePlayingStore()
const { playingStatus, currentTrack, audioElement } = storeToRefs(playingStore)

const isCurrentTrack = computed(
  () => playingStore.currentTrack?.id === props.track.id
)

function onClick() {
  if (!isCurrentTrack.value || playingStatus.value === PlayingStatus.Stopped) {
    currentTrack.value = props.track
    return
  }

  if (playingStatus.value === PlayingStatus.Playing) {
    audioElement.value.pause()
    return
  }

  if (playingStatus.value === PlayingStatus.Paused) {
    audioElement.value.play()
    return
  }
}
</script>
