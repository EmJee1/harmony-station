<template>
  <div>
    <div class="relative w-48">
      <input
        @input="onSearchInput"
        v-debounce:500ms="onDebouncedSearch"
        type="text"
        class="w-full rounded border-2 px-2 py-1"
      />
      <div
        class="pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2"
      >
        <MagnifyingGlassIcon v-if="!loading" />
        <Spinner v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MagnifyingGlassIcon from '@heroicons/vue/24/outline/MagnifyingGlassIcon'
import { ref } from 'vue'
import Spinner from './Spinner.vue'
import type { DbAlbum } from '../../types/albums'

const loading = ref(false)
const searchResult = ref<{ albums: DbAlbum[] }>({})

function onSearchInput() {
  loading.value = true
}

async function onDebouncedSearch(query: string) {
  const result = await window.electronAPI.search(query)
  loading.value = false
}
</script>
