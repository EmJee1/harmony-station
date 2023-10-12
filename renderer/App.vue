<template>
  <div class="container">
    <RouterLink to="/">Home</RouterLink>
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useSettingsStore } from './stores/settings-store'

const { fetchSettings } = useSettingsStore()

onMounted(async () => {
  await Promise.all([fetchSettings()])
})
</script>
