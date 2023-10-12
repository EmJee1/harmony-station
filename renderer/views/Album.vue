<template>
  <p v-if="!album">Loading...</p>
  <template v-else>
    <div class="flex items-center gap-4">
      <img src="#" alt="" class="aspect-square w-16 bg-red-600 md:w-32" />
      <div>
        <Typography is="h1" variant="heading-1" weight="bold">
          {{ album.title }}
        </Typography>
        <Typography v-for="artist in albumArtists" :key="artist.id">
          {{ artist.name }}
        </Typography>
      </div>
    </div>
    <ul class="mt-8">
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
import type { DbTrack } from '../../types/tracks'
import type { DbAlbum } from '../../types/albums'
import type { DbArtist } from '../../types/artist'
import { usePlayingStore } from '../stores/playing-store'
import Typography from '../components/Typography.vue'

const route = useRoute()
const playingStore = usePlayingStore()

const tracks = ref<DbTrack[]>([])
const album = ref<DbAlbum>()
const albumArtists = ref<DbArtist[]>([])

onMounted(async () => {
  const result = await window.electronAPI.getAlbum(Number(route.params.id))
  tracks.value = result.tracks
  album.value = result.album
  albumArtists.value = result.albumArtists
})

function onPlay(track: DbTrack) {
  playingStore.currentTrack = track
}
</script>
