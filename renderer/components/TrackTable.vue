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
        class="hover:bg-slate-100"
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

type Column = 'play-track' | 'play-queue-track' | 'artists' | 'title' | 'year'

interface Props {
  isQueue?: boolean
  columns?: Column[]
  tracks: DbTrack[]
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
