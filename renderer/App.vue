<template>
  <div class="w-full bg-slate-100 p-4">
    <div class="container flex items-center gap-8">
      <ButtonIcon is="RouterLink" to="/">
        <HomeIcon />
      </ButtonIcon>
      <Search class="w-full" />
      <ButtonIcon is="RouterLink" to="/settings">
        <CogIcon />
      </ButtonIcon>
    </div>
  </div>
  <div class="container mt-4">
    <RouterView />
    <CurrentlyPlayingBar />
  </div>
</template>

<script lang="ts" setup>
import HomeIcon from '@heroicons/vue/24/outline/HomeIcon'
import CogIcon from '@heroicons/vue/24/outline/CogIcon'
import { onMounted } from 'vue'
import ButtonIcon from './components/ButtonIcon.vue'
import CurrentlyPlayingBar from './components/CurrentlyPlayingBar.vue'
import Search from './components/Search.vue'
import { useSettingsStore } from './stores/settings-store'

const { fetchSettings } = useSettingsStore()

onMounted(async () => {
  await Promise.all([fetchSettings()])
})
</script>
