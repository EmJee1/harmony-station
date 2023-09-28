<template>
  <h1>Home</h1>
  <button @click="onScan">Scan files</button>
  <h3>Recently added tracks</h3>
  <div v-for="track in tracksStore.tracks">
    <p>{{ track.title }}</p>
    <p>{{ track.artists }}</p>
    <p>{{ track.album }}</p>
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
