<template>
  <div class="font-serif">
    <div class="w-full bg-slate-100 p-4">
      <Container class="flex items-center gap-8">
        <ButtonIcon
          is="button"
          :disabled="route.path === '/'"
          @click="router.back"
        >
          <ChevronLeftIcon />
        </ButtonIcon>
        <ButtonIcon is="RouterLink" to="/">
          <HomeIcon />
        </ButtonIcon>
        <Search class="w-full" />
        <ButtonIcon is="RouterLink" to="/settings">
          <CogIcon />
        </ButtonIcon>
      </Container>
    </div>
    <Container class="mb-20 mt-8">
      <RouterView />
    </Container>
    <CurrentlyPlayingBar />
    <HealthCheckResult trigger="immediately" />
    <FullscreenLoader v-if="fullscreenLoaderActive" />
    <ToastProvider />
  </div>
</template>

<script lang="ts" setup>
import ChevronLeftIcon from '@heroicons/vue/24/outline/ChevronLeftIcon'
import HomeIcon from '@heroicons/vue/24/outline/HomeIcon'
import CogIcon from '@heroicons/vue/24/outline/CogIcon'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ButtonIcon from './components/ButtonIcon.vue'
import Container from './components/Container.vue'
import CurrentlyPlayingBar from './components/CurrentlyPlayingBar.vue'
import FullscreenLoader from './components/FullscreenLoader.vue'
import HealthCheckResult from './components/HealthCheckResult.vue'
import Search from './components/Search.vue'
import ToastProvider from './components/ToastProvider.vue'
import { useContextMenuResponses } from './composables/context-menu-responses'
import { useSettingsStore } from './stores/settings-store'
import { useFullscreenLoaderStore } from './stores/fullscreen-loader-store'

useContextMenuResponses()
const { fetchSettings } = useSettingsStore()
const { fullscreenLoaderActive } = storeToRefs(useFullscreenLoaderStore())
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await fetchSettings()
})
</script>
