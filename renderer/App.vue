<template>
  <div class="font-serif">
    <div class="w-full bg-slate-100 p-4">
      <Container class="flex items-center gap-8">
        <ButtonIcon is="RouterLink" to="/">
          <HomeIcon />
        </ButtonIcon>
        <Search class="w-full" />
        <ButtonIcon is="RouterLink" to="/settings">
          <CogIcon />
        </ButtonIcon>
      </Container>
    </div>
    <Container class="mt-8">
      <RouterView />
      <CurrentlyPlayingBar />
    </Container>
    <FullscreenLoader v-if="fullscreenLoaderActive" />
  </div>
</template>

<script lang="ts" setup>
import HomeIcon from '@heroicons/vue/24/outline/HomeIcon'
import CogIcon from '@heroicons/vue/24/outline/CogIcon'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import ButtonIcon from './components/ButtonIcon.vue'
import Container from './components/Container.vue'
import CurrentlyPlayingBar from './components/CurrentlyPlayingBar.vue'
import FullscreenLoader from './components/FullscreenLoader.vue'
import Search from './components/Search.vue'
import { useSettingsStore } from './stores/settings-store'
import { useFullscreenLoaderStore } from './stores/fullscreen-loader'

const { fetchSettings } = useSettingsStore()
const { fullscreenLoaderActive } = storeToRefs(useFullscreenLoaderStore())

onMounted(async () => {
  await Promise.all([fetchSettings()])
})
</script>
