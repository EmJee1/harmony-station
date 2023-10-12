<template>
  <div></div>
</template>

<script setup lang="ts">
import type { DbTrack } from '../../types/tracks'

defineProps<{
  tracks: DbTrack[]
}>()
</script>
