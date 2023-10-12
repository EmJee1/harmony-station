<template>
  <h1 class="text-3xl font-bold">Home</h1>
  <button class="border border-amber-800 px-2 py-1" @click="onScan">
    Scan files
  </button>
  <h3>Tracks</h3>
  <Carousel>
    <Card
      v-for="track in tracksStore.tracks"
      :title="track.title"
      to="/album/25"
      image="#"
      class="w-48 min-w-[12rem]"
    >
      {{ track.title }}
    </Card>
  </Carousel>
</template>

<script lang="ts" setup>
import { useTracksStore } from '../stores/tracks-store'
import Carousel from '../components/Carousel.vue'
import Card from '../components/Card.vue'

const tracksStore = useTracksStore()

async function onScan() {
  await window.electronAPI.scanTracks()
  await tracksStore.fetchTracks()
}
</script>
