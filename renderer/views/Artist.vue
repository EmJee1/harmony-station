<template>
  <p v-if="!artist">Loading...</p>
  <template v-else>
    <Typography is="h1" variant="heading-1">
      {{ artist.name }}
    </Typography>
    <TrackTable :tracks="artist.tracks" class="mt-6" />
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Typography from '../components/Typography.vue'
import type { DbArtist } from '../../types/artist'
import TrackTable from '../components/TrackTable.vue'

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
