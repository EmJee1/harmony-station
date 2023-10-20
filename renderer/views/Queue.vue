<template>
  <Typography is="h1" variant="heading-2">Queue</Typography>
  <TrackTable :tracks="queue" :columns="['title', 'year']" class="mt-6" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Typography from '../components/Typography.vue'
import TrackTable from '../components/TrackTable.vue'
import { useQueueStore } from '../stores/queue-store'

const { queue } = storeToRefs(useQueueStore())
</script>
