<template>
  <div class="absolute left-0 z-10 w-full rounded-b bg-slate-100 p-3 shadow">
    <div v-if="hasResults" class="space-y-6">
      <div v-if="searchResult.albums.length">
        <Typography is="p" variant="body" weight="bold">
          Albums ({{ searchResult.albums.length }})
        </Typography>
        <div class="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3">
          <div
            v-for="album in searchResult.albums"
            :key="album.id"
            class="col-span-1 hover:underline"
          >
            <RouterLink
              :to="`/album/${album.id}`"
              class="flex items-center gap-4"
              @click="emit('result-click')"
            >
              <img :src="album.cover" alt="" class="h-12 w-12" />
              <Typography is="p" variant="body" class="truncate">
                {{ album.title }}
              </Typography>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="searchResult.artists.length">
        <Typography is="p" variant="body" weight="bold">
          Artists ({{ searchResult.artists.length }})
        </Typography>
        <div class="mt-4 flex flex-col gap-2">
          <div v-for="artist in searchResult.artists" :key="artist.id">
            <RouterLink
              :to="`/artist/${artist.id}`"
              class="flex items-center gap-4 hover:underline"
              @click="emit('result-click')"
            >
              <Typography is="p" variant="body" class="truncate">
                {{ artist.name }}
              </Typography>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="searchResult.tracks.length">
        <Typography is="p" variant="body" weight="bold">
          Tracks ({{ searchResult.tracks.length }})
        </Typography>
        <div class="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3">
          <div v-for="track in searchResult.tracks" :key="track.id">
            <RouterLink
              :to="`/album/${track.album?.id}`"
              class="flex items-center gap-4 hover:underline"
              @click="emit('result-click')"
            >
              <Typography is="p" variant="body" class="truncate">
                {{ track.title }}
              </Typography>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <template v-else-if="!loading">
      <Typography is="p" variant="heading-3" weight="bold">
        \ (0_0) /
      </Typography>
      <Typography is="p" variant="body" weight="light" class="mt-1">
        No results found for that query
      </Typography>
    </template>
    <template v-else>
      <Typography is="p" variant="body" weight="light">
        Hang tight while we search...
      </Typography>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Typography from './Typography.vue'
import type { DbAlbum } from '../../types/albums'
import type { DbArtist } from '../../types/artist'
import type { DbTrack } from '../../types/tracks'

const props = defineProps<{
  searchResult: { albums: DbAlbum[]; artists: DbArtist[]; tracks: DbTrack[] }
  loading: boolean
}>()

const emit = defineEmits<(e: 'result-click') => void>()

const hasResults = computed(() => {
  return props.searchResult.albums.length || props.searchResult.artists.length
})
</script>
