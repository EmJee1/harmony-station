<template>
  <p v-if="!album">Loading...</p>
  <template v-else>
    <div class="flex items-center gap-4">
      <Lightbox :src="album.cover" :subtitle="album.title">
        <img
          :src="album.cover"
          alt=""
          class="h-16 w-16 border-none bg-red-600 md:h-32 md:w-32"
        />
      </Lightbox>
      <div>
        <Typography is="h1" variant="heading-1" weight="bold">
          {{ album.title }}
        </Typography>
        <RouterLink
          v-for="(artist, index) in album.albumArtists"
          :key="artist.id"
          :to="`/artist/${artist.id}`"
          class="hover:underline"
        >
          {{ artist.name
          }}<span v-if="index + 1 !== album.albumArtists.length">, </span>
        </RouterLink>
      </div>
    </div>
    <Button @click="onPlayAlbum" class="mt-6">Play album</Button>
    <TrackTable :tracks="album.tracks" class="mt-6" />
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Typography from '../components/Typography.vue'
import { useAudioControls } from '../composables/audio-controls'
import type { DbAlbum } from '../../types/albums'
import Button from '../components/Button.vue'
import Lightbox from '../components/Lightbox.vue'
import TrackTable from '../components/TrackTable.vue'

const route = useRoute()
const { addToQueue, playTrack, clearQueue } = useAudioControls()

const album = ref<Required<DbAlbum>>()

function onPlayAlbum() {
  const [firstTrack, ...rest] = album.value.tracks
  playTrack(firstTrack)
  clearQueue()
  addToQueue(...rest)
}

watch(
  () => route.params.id,
  async albumId => {
    album.value = await window.electronAPI.getAlbum(Number(albumId))
  },
  { immediate: true }
)
</script>
