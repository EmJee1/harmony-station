<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useSettingsStore } from './stores/settings-store'
import { useTracksStore } from './stores/tracks-store'

const { fetchSettings } = useSettingsStore()
const { fetchTracks } = useTracksStore()

onMounted(async () => {
  await Promise.all([fetchSettings(), fetchTracks()])
})
</script>