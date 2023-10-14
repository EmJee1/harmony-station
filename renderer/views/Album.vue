<template>
  <p v-if="!album">Loading...</p>
  <template v-else>
    <div class="flex items-center gap-4">
      <img
        :src="album.cover"
        alt=""
        class="aspect-square w-16 bg-red-600 md:w-32"
      />
      <div>
        <Typography is="h1" variant="heading-1" weight="bold">
          {{ album.title }}
        </Typography>
        <Typography v-for="artist in album.albumArtists" :key="artist.id">
          {{ artist.name }}
        </Typography>
      </div>
    </div>
    <ul class="mt-6 space-y-4">
      <li
        v-for="(track, index) in album.tracks"
        :key="track.id"
        class="flex gap-2"
      >
        <PlayTrackButton :track="track" />
        <span>#{{ index + 1 }}</span>
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
import type { DbAlbum } from '../../types/albums'

const route = useRoute()

const album = ref<Required<DbAlbum>>()

watch(
  () => route.params.id,
  async albumId => {
    album.value = await window.electronAPI.getAlbum(Number(albumId))
  },
  { immediate: true }
)
</script>
