<template>
  <h1 class="text-3xl font-bold">Home</h1>
  <button class="border border-amber-800 px-2 py-1" @click="onScan">
    Scan files
  </button>
  <h3>Tracks</h3>
  <Carousel>
    <Card
      v-for="album in albums"
      :title="album.title"
      :to="`/album/${album.id}`"
      image="#"
      class="w-48 min-w-[12rem]"
    >
      {{ album.title }}
    </Card>
  </Carousel>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Carousel from '../components/Carousel.vue'
import Card from '../components/Card.vue'
import type { DbAlbum } from '../../types/albums'

const albums = ref<DbAlbum[]>([])

onMounted(async () => {
  albums.value = await window.electronAPI.getAlbums(10)
})

async function onScan() {
  await window.electronAPI.scanTracks()
}
</script>
