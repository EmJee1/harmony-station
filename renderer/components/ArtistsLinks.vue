<template>
  <Typography
    v-if="artists?.length"
    v-for="(artist, index) in artists"
    :key="artist.id"
    is="span"
    variant="body"
    weight="normal"
  >
    <Link :to="`/artist/${artist.id}`">{{ artist.name }}</Link>
    <span v-if="index + 1 !== artists.length">, </span>
  </Typography>
  <Typography v-else is="span" variant="body" weight="normal">-</Typography>
</template>

<script setup lang="ts">
import Link from './Link.vue'
import Typography from './Typography.vue'
import type { DbArtist } from '../../types/artist'

defineProps<{
  artists?: DbArtist[]
}>()
</script>
