<template>
  <template v-if="artist">
    <Typography is="h1" variant="heading-1">
      {{ artist.name }}
    </Typography>
    <TrackTable
      :tracks="artist.tracks"
      :columns="['play-track', 'title', 'artists', 'year']"
      class="mt-6"
    />

    <Typography is="h2" variant="heading-2" weight="bold" class="mt-6">
      Albums
    </Typography>
    <div class="mt-4 grid grid-cols-5 gap-6 lg:grid-cols-6">
      <Card
        v-for="album in artist.albums"
        :title="album.title"
        :to="`/album/${album.id}`"
        :image="album.cover"
        class="col-span-1"
      >
        {{ album.title }}
      </Card>
    </div>
  </template>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import Typography from '../components/Typography.vue'
import TrackTable from '../components/TrackTable.vue'
import Card from '../components/Card.vue'
import { useElectronRequest } from '../composables/electron-request'

const route = useRoute()

const { execute, response: artist } = useElectronRequest(
  'getArtist',
  'Loading artist'
)

watch(
  () => route.params.id,
  async artistId => await execute(Number(artistId)),
  { immediate: true }
)
</script>
