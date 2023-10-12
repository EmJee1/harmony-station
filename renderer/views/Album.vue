<template>
  <p v-if="!album">Loading...</p>
  <template v-else>
    <h1 class="text-3xl font-bold">{{ album.title }}</h1>
    <ul>
      <li v-for="(track, index) in tracks" :key="track.id">
        <button @click="onPlay(track)">Play</button> {{ index + 1 }}
        {{ track.title }}
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { DbTrack } from '../../types/tracks'
import { DbAlbum } from '../../types/albums'
import { usePlayingStore } from '../stores/playing-store'

const route = useRoute()
const playingStore = usePlayingStore()

const tracks = ref<DbTrack[]>([])
const album = ref<DbAlbum>()

onMounted(async () => {
  const result = await window.electronAPI.getAlbum(Number(route.params.id))
  tracks.value = result.tracks
  album.value = result.album
})

function onPlay(track: DbTrack) {
  playingStore.currentTrack = track
}
</script>
