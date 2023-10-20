<template>
  <ButtonIcon
    @click="onPlayQueueTrack"
    aria-label="play track"
    class="translate-y-1"
  >
    <PlayIcon />
  </ButtonIcon>
</template>

<script setup lang="ts">
import PlayIcon from '@heroicons/vue/24/outline/PlayIcon'
import ButtonIcon from '../ButtonIcon.vue'
import { useAudioControls } from '../../composables/audio-controls'
import type { DbTrack } from '../../../types/tracks'

const props = defineProps<{
  track: DbTrack
}>()

const { playQueueTrack } = useAudioControls()

function onPlayQueueTrack() {
  playQueueTrack(props.track)
}
</script>
