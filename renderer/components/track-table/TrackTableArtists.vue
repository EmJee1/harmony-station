<template>
  <span
    v-if="artists?.length"
    v-for="(artist, index) in artists"
    :key="artist.id"
  >
    <RouterLink :to="`/artist/${artist.id}`" class="hover:underline">
      {{ artist.name }}
    </RouterLink>
    <span v-if="index + 1 !== artists.length">, </span>
  </span>
  <span v-else>-</span>
</template>

<script setup lang="ts">
import type { DbArtist } from '../../../types/artist'

defineProps<{
  artists?: DbArtist[]
}>()
</script>
