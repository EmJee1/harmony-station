<template>
  <Typography is="h1" variant="heading-1">Home</Typography>
  <h3>Tracks</h3>
  <Carousel>
    <Card
      v-for="album in albums"
      :title="album.title"
      :to="`/album/${album.id}`"
      :image="album.cover"
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
import Typography from '../components/Typography.vue'
import type { DbAlbum } from '../../types/albums'

const albums = ref<DbAlbum[]>([])

onMounted(async () => {
  albums.value = await window.electronAPI.getAlbums(10)
})
</script>
