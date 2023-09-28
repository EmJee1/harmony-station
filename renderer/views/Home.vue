<template>
  <h1 class="text-3xl font-bold">Home</h1>
  <button class="border border-amber-800 px-2 py-1" @click="onScan">
    Scan files
  </button>
  <h3>Recently added tracks</h3>
  <div v-for="track in tracksStore.tracks">
    <p>{{ track.title }} - by {{ track.artists.join(', ') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useTracksStore } from '../stores/tracks-store'

const tracksStore = useTracksStore()

async function onScan() {
  await window.electronAPI.scanTracks()
  await tracksStore.fetchTracks()
}
</script>
