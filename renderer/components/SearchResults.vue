<template>
  <div class="absolute left-0 w-full rounded-b bg-slate-100 p-3 shadow">
    <template v-if="searchResult.albums.length">
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
            <Typography is="p" variant="body">
              {{ album.title }}
            </Typography>
          </RouterLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Typography from './Typography.vue'
import type { DbAlbum } from '../../types/albums'

defineProps<{
  searchResult: { albums: DbAlbum[] }
}>()

const emit = defineEmits<{
  (e: 'result-click'): void
}>()
</script>
