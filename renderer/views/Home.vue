<template>
  <Typography is="h1" variant="heading-2">Your albums</Typography>
  <div class="mt-4 grid grid-cols-5 gap-6 lg:grid-cols-6">
    <Card
      v-for="album in albums"
      :title="album.title"
      :to="`/album/${album.id}`"
      :image="album.cover"
      class="col-span-1"
    >
      {{ album.title }}
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Card from '../components/Card.vue'
import Typography from '../components/Typography.vue'
import { useElectronRequest } from '../composables/electron-request'

const { execute, response: albums } = useElectronRequest('getAlbums')

onMounted(() => execute(10))
</script>
