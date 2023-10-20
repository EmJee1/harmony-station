<template>
  <PlayTrackButton :track="track" class="translate-y-1" />
</template>

<script setup lang="ts">
import PlayTrackButton from '../PlayTrackButton.vue'
import type { DbTrack } from '../../../types/tracks'

defineProps<{
  track: DbTrack
}>()
</script>
