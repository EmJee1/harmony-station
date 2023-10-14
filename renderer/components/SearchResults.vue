<template>
  <div class="absolute left-0 bg-slate-100 p-3">
    <template v-if="searchResult.albums.length">
      <Typography is="p" variant="body" weight="bold">
        Albums ({{ searchResult.albums.length }})
      </Typography>
      <ul>
        <li v-for="album in searchResult.albums" :key="album.id">
          <RouterLink
            :to="`/album/${album.id}`"
            class="flex items-center gap-2"
            @click="emit('result-click')"
          >
            <img :src="album.cover" alt="" class="h-12 w-12" />
            <Typography is="p" variant="body">
              {{ album.title }}
            </Typography>
          </RouterLink>
        </li>
      </ul>
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
