<template>
  <p v-if="!album">Loading...</p>
  <template v-else>
    <div class="flex items-center gap-4">
      <button
        class="group relative h-16 w-16 border-none md:h-32 md:w-32"
        @click="onPlayAlbum"
      >
        <img :src="album.cover" alt="" class="h-full w-full bg-red-600" />
        <div
          class="absolute inset-0 hidden h-full w-full bg-black/20 group-hover:block"
        >
          <PlayIcon
            class="absolute left-1/2 top-1/2 hidden h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-white group-hover:block"
          />
        </div>
      </button>
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
    <ul class="mt-6 space-y-4">
      <li
        v-for="(track, index) in album.tracks"
        :key="track.id"
        class="flex gap-2"
      >
        <PlayTrackButton :track="track" />
        <span>#{{ index + 1 }}</span>
        <span>{{ track.title }}</span>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import PlayIcon from '@heroicons/vue/24/outline/PlayIcon'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PlayTrackButton from '../components/PlayTrackButton.vue'
import Typography from '../components/Typography.vue'
import { useAudioControls } from '../composables/audio-controls'
import type { DbAlbum } from '../../types/albums'

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
