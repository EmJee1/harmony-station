<template>
  <table class="w-full divide-y divide-slate-400">
    <thead>
      <tr class="text-left">
        <th v-for="column in columns" :key="column.name" class="pb-2">
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="track in tracks" :key="track.id" class="hover:bg-slate-100">
        <td v-for="column in columns" :key="column.name" class="py-2">
          <template v-if="column.type === 'from-track'">
            {{ track[column.key] }}
          </template>
          <template v-else-if="column.type === 'custom'">
            <PlayTrackButton
              v-if="column.customId === 'play-track-button'"
              :track="track"
              class="translate-y-1"
            />
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import PlayTrackButton from './PlayTrackButton.vue'
import { DbTrack } from '../../types/tracks'

defineProps<{
  tracks: DbTrack[]
}>()

interface BaseColumn {
  type: 'from-track' | 'custom'
  name: string
}

interface ColumnFromTrack extends BaseColumn {
  type: 'from-track'
  key: keyof DbTrack
}

interface CustomColumn extends BaseColumn {
  type: 'custom'
  customId: 'play-track-button'
}

const columns: (ColumnFromTrack | CustomColumn)[] = [
  { name: 'Play', type: 'custom', customId: 'play-track-button' },
  { name: 'Title', type: 'from-track', key: 'title' },
  { name: 'Year', type: 'from-track', key: 'year' },
]
</script>
