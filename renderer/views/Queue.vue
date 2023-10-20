<template>
  <Typography is="h1" variant="heading-2">Queue</Typography>
  <TrackTable
    v-if="queue.length"
    :tracks="queue"
    :columns="['play-queue-track', 'title', 'year']"
    is-queue
    class="mt-6"
  />
  <NoResults v-else title="The queue is empty" class="" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import NoResults from '../components/NoResults.vue'
import Typography from '../components/Typography.vue'
import TrackTable from '../components/TrackTable.vue'
import { useQueueStore } from '../stores/queue-store'

const { queue } = storeToRefs(useQueueStore())
</script>
