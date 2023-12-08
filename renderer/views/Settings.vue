<template>
  <Typography is="h1" variant="heading-1">Settings</Typography>
  <NoResults v-if="!settings" title="Failed to fetch settings" />
  <SettingsSection v-else title="Your local library">
    <div v-if="settings.audioDirectories.length" class="space-y-2">
      <div
        v-for="audioDir in settings.audioDirectories"
        :key="audioDir"
        class="group flex justify-between rounded p-2 hover:bg-slate-100"
      >
        <Typography is="p" variant="body">
          {{ audioDir }}
        </Typography>
        <ButtonIcon
          class="hidden group-hover:block"
          aria-label="remove directory"
          @click="onRemoveDirectory(audioDir)"
        >
          <TrashIcon />
        </ButtonIcon>
      </div>
    </div>
    <template v-else>
      <Typography is="p" variant="body">
        You have not added any directories yet.
      </Typography>
    </template>
    <div class="space-x-2">
      <Button @click="onAddDirectory">Add directory</Button>
      <Button @click="onScan">Scan</Button>
    </div>
  </SettingsSection>
</template>

<script setup lang="ts">
import TrashIcon from '@heroicons/vue/24/outline/TrashIcon'
import { storeToRefs } from 'pinia'
import Button from '../components/Button.vue'
import ButtonIcon from '../components/ButtonIcon.vue'
import SettingsSection from '../components/SettingsSection.vue'
import Typography from '../components/Typography.vue'
import { useFullscreenLoaderStore } from '../stores/fullscreen-loader-store'
import { useSettingsStore } from '../stores/settings-store'
import NoResults from '../components/NoResults.vue'

const { registerFullscreenLoader, unregisterFullscreenLoader } =
  useFullscreenLoaderStore()
const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

const SCAN_TRACKS_LOADER = Symbol()

async function onScan() {
  registerFullscreenLoader(SCAN_TRACKS_LOADER, 'Scanning tracks...')
  await window.electronAPI.scanTracks()
  unregisterFullscreenLoader(SCAN_TRACKS_LOADER)
}

async function onAddDirectory() {
  if (!settings.value) {
    return
  }

  const result = await window.electronAPI.selectDirectory()
  if (!result.canceled) {
    await settingsStore.updateSettings({
      audioDirectories: [
        ...settings.value.audioDirectories,
        ...result.filePaths,
      ],
    })
  }
}

async function onRemoveDirectory(directory: string) {
  if (!settings.value) {
    return
  }

  await settingsStore.updateSettings({
    audioDirectories: settings.value.audioDirectories.filter(
      dir => dir !== directory
    ),
  })
}
</script>
