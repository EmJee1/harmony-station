<template>
  <Typography
    v-if="genres?.length"
    v-for="(genre, index) in genres"
    :key="genre.id"
    is="span"
    variant="body"
    weight="normal"
  >
    <Link :to="`/genre/${genre.id}`">{{ genre.name }}</Link>
    <span v-if="index + 1 !== genres.length">, </span>
  </Typography>
  <Typography v-else is="span" variant="body" weight="normal">-</Typography>
</template>

<script setup lang="ts">
import Link from '../Link.vue'
import Typography from '../Typography.vue'
import { DbGenre } from '../../../types/genres'

defineProps<{
  genres?: DbGenre[]
}>()
</script>
