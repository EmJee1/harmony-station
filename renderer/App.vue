<template>
  <div class="container">
    <RouterLink to="/">Home</RouterLink>
    <RouterView />
    <CurrentlyPlayingBar />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useSettingsStore } from './stores/settings-store'
import CurrentlyPlayingBar from './components/CurrentlyPlayingBar.vue'

const { fetchSettings } = useSettingsStore()

onMounted(async () => {
  await Promise.all([fetchSettings()])
})
</script>
