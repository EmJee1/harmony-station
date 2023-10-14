<template>
  <p v-if="!artist">Loading...</p>
  <template v-else>
    <Typography is="h1" variant="heading-1">
      {{ artist.name }}
    </Typography>
    <ul class="mt-6 space-y-4">
      <li v-for="track in artist.tracks" :key="track.id" class="flex gap-2">
        <PlayTrackButton :track="track" />
        <span>{{ track.title }}</span>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PlayTrackButton from '../components/PlayTrackButton.vue'
import Typography from '../components/Typography.vue'
import type { DbArtist } from '../../types/artist'

const route = useRoute()

const artist = ref<Required<DbArtist>>()

watch(
  () => route.params.id,
  async artistId => {
    artist.value = await window.electronAPI.getArtist(Number(artistId))
  },
  { immediate: true }
)
</script>
