<template>
  <p v-if="!album">Loading...</p>
  <template v-else>
    <h1 class="text-3xl font-bold">{{ album.title }}</h1>
    <ul v-for="track in tracks" :key="track.id">
      <li>{{ track.title }}</li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { DbTrack } from '../../types/tracks'
import { DbAlbum } from '../../types/albums'

const route = useRoute()

const tracks = ref<DbTrack[]>([])
const album = ref<DbAlbum>()

onMounted(async () => {
  const result = await window.electronAPI.getAlbum(Number(route.params.id))
  tracks.value = result.tracks
  album.value = result.album
})
</script>
