<template>
  <table class="w-full divide-y divide-slate-400">
    <thead>
      <tr class="text-left">
        <th v-for="column in columns" :key="column" class="pb-2">
          {{ columnConfig[column].name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="track in tracks" :key="track.id" class="hover:bg-slate-100">
        <td v-for="column in columns" :key="column" class="py-2">
          <template v-if="columnConfig[column].type === 'from-track'">
            {{ track[(columnConfig[column] as ColumnFromTrack).key] }}
          </template>
          <template v-else-if="columnConfig[column].type === 'custom'">
            <PlayTrackButton
              v-if="column === 'play-track'"
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

type Column = 'play-track' | 'title' | 'year'

type Props = {
  columns?: Column[]
  tracks: DbTrack[]
}

withDefaults(defineProps<Props>(), {
  columns: ['play-track', 'title', 'year'],
})

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
}

const columnConfig: Record<Column, ColumnFromTrack | CustomColumn> = {
  'play-track': { name: 'Play', type: 'custom' },
  title: { name: 'Title', type: 'from-track', key: 'title' },
  year: { name: 'Year', type: 'from-track', key: 'year' },
}
</script>