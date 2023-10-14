<template>
  <div class="absolute left-0 w-full rounded-b bg-slate-100 p-3 shadow">
    <template v-if="hasResults">
      <Typography is="p" variant="body" weight="bold">
        Albums ({{ searchResult.albums.length }})
      </Typography>
      <div class="mt-4 flex flex-col gap-2">
        <div v-for="album in searchResult.albums" :key="album.id">
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
    </template>
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

const props = defineProps<{
  searchResult: { albums: DbAlbum[] }
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'result-click'): void
}>()

const hasResults = computed(() => {
  return props.searchResult.albums.length
})
</script>
