<template>
  <ArtistsLinks :artists="artists" />
</template>

<script setup lang="ts">
import type { DbArtist } from '../../../types/artist'
import ArtistsLinks from '../ArtistsLinks.vue'

defineProps<{
  artists?: DbArtist[]
}>()
</script>
