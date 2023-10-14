<template>
  <p v-if="!album">Loading...</p>
  <template v-else>
    <div class="flex items-center gap-4">
      <img
        :src="album.cover"
        alt=""
        class="aspect-square w-16 bg-red-600 md:w-32"
      />
      <div>
        <Typography is="h1" variant="heading-1" weight="bold">
          {{ album.title }}
        </Typography>
        <Typography v-for="artist in album.albumArtists" :key="artist.id">
          {{ artist.name }}
        </Typography>
      </div>
    </div>
    <ul class="mt-6 space-y-4">
      <li
        v-for="(track, index) in album.tracks"
        :key="track.id"
        class="flex gap-2"
      >
        <ButtonIcon @click="onPlay(track)">
          <PlayIcon />
        </ButtonIcon>
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
import type { DbTrack } from '../../types/tracks'
import type { DbAlbum } from '../../types/albums'
import { usePlayingStore } from '../stores/playing-store'
import Typography from '../components/Typography.vue'
import ButtonIcon from '../components/ButtonIcon.vue'

const route = useRoute()
const playingStore = usePlayingStore()

const album = ref<Required<DbAlbum>>()

watch(
  () => route.params.id,
  async albumId => {
    album.value = await window.electronAPI.getAlbum(Number(albumId))
  },
  { immediate: true }
)

function onPlay(track: DbTrack) {
  playingStore.currentTrack = track
}
</script>
