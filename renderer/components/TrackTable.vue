<template>
  <table class="w-full divide-y divide-slate-400">
    <thead>
      <tr class="text-left">
        <th v-for="column in columns" :key="column" class="pb-2">
          {{ columnConfig[column].name }}
        </th>
      </tr>
    </thead>
    <TransitionGroup name="table-rows" tag="tbody">
      <ContextMenu
        v-for="track in tracks"
        :key="track.id"
        is="tr"
        :context-menu-arg="getContextMenuArgs(track)"
        class="transition-colors hover:bg-slate-100"
        :class="{
          'bg-slate-200': highlightedTrackId === track.id,
        }"
      >
        <td v-for="column in columns" :key="column" class="py-2">
          <template v-if="columnConfig[column].type === 'from-track'">
            {{ track[(columnConfig[column] as ColumnFromTrack).key] }}
          </template>
          <template v-else-if="columnConfig[column].type === 'custom'">
            <TrackTablePlayTrack
              v-if="column === 'play-track'"
              :track="track"
            />
            <TrackTablePlayQueueTrack
              v-else-if="column === 'play-queue-track'"
              :track="track"
            />
            <TrackTableArtists
              v-else-if="column === 'artists'"
              :artists="track.artists"
            />
            <TrackTableGenres
              v-else-if="column === 'genres'"
              :genres="track.genres"
            />
          </template>
        </td>
      </ContextMenu>
    </TransitionGroup>
  </table>
</template>

<script setup lang="ts">
import TrackTableArtists from './track-table/TrackTableArtists.vue'
import TrackTablePlayQueueTrack from './track-table/TrackTablePlayQueueTrack.vue'
import TrackTablePlayTrack from './track-table/TrackTablePlayTrack.vue'
import ContextMenu from './ContextMenu.vue'
import type { DbTrack } from '../../types/tracks'
import type { ContextMenuRequest } from '../../types/context-menu'
import TrackTableGenres from './track-table/TrackTableGenres.vue'

type Column =
  | 'play-track'
  | 'play-queue-track'
  | 'artists'
  | 'genres'
  | 'title'
  | 'year'

interface Props {
  isQueue?: boolean
  columns?: Column[]
  tracks: DbTrack[]
  highlightedTrackId?: number | null
}

const props = defineProps<Props>()

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
  'play-queue-track': { name: 'Play', type: 'custom' },
  artists: { name: 'Artists', type: 'custom' },
  genres: { name: 'Genre(s)', type: 'custom' },
  title: { name: 'Title', type: 'from-track', key: 'title' },
  year: { name: 'Year', type: 'from-track', key: 'year' },
}

function getContextMenuArgs(track: DbTrack): ContextMenuRequest {
  if (props.isQueue) {
    return {
      version: 'queue-item',
      track: JSON.stringify(track),
    }
  }

  return {
    version: 'track',
    track: JSON.stringify(track),
  }
}
</script>
