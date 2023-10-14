<template>
  <div class="relative" v-click-outside="onClickOutside">
    <input
      v-model="query"
      @input="onSearchInput"
      @click="onSearchClick"
      v-debounce:500ms="onDebouncedSearch"
      placeholder="Search for an album..."
      type="text"
      class="peer w-full rounded border border-slate-400 bg-slate-100 px-2 py-1 ring-0 focus:border-slate-600 focus:outline-none"
      :class="{
        'rounded-b-none': searchResultsActive,
      }"
    />
    <div
      class="pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-slate-600"
    >
      <MagnifyingGlassIcon v-if="!loading" />
      <Spinner v-else />
    </div>
    <SearchResults
      v-if="searchResultsActive"
      :search-result="searchResult"
      :loading="loading"
      @result-click="onResultClick"
    />
  </div>
</template>

<script lang="ts" setup>
import MagnifyingGlassIcon from '@heroicons/vue/24/outline/MagnifyingGlassIcon'
import { computed, ref } from 'vue'
import SearchResults from './SearchResults.vue'
import Spinner from './Spinner.vue'
import type { DbAlbum } from '../../types/albums'

const query = ref('')
const focussed = ref(false)
const loading = ref(false)
const searchResult = ref<{ albums: DbAlbum[] }>({ albums: [] })

const searchResultsActive = computed(() => query.value && focussed.value)

function resetSearchResult() {
  searchResult.value = { albums: [] }
}

function onSearchInput() {
  loading.value = true
}

async function onDebouncedSearch(query: string) {
  if (!query) {
    resetSearchResult()
    loading.value = false
    return
  }

  searchResult.value = await window.electronAPI.search(query)
  loading.value = false
}

function onSearchClick() {
  focussed.value = true
}

function onClickOutside() {
  focussed.value = false
}

function onResultClick() {
  focussed.value = false
  resetSearchResult()
  query.value = ''
}
</script>
