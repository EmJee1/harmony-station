<template>
  <Typography is="h1" variant="heading-1">Settings</Typography>
  <SettingsSection title="Your local library">
    <template v-if="settings.audioDirectories.length">
      <div v-for="audioDir in settings.audioDirectories" :key="audioDir">
        <Typography is="p" variant="body">
          {{ audioDir }}
        </Typography>
      </div>
    </template>
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
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import Button from '../components/Button.vue'
import Typography from '../components/Typography.vue'
import { useSettingsStore } from '../stores/settings-store'
import SettingsSection from '../components/SettingsSection.vue'

const scanning = ref(false)
const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

async function onScan() {
  scanning.value = true
  await window.electronAPI.scanTracks()
  scanning.value = false
}

async function onAddDirectory() {
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
</script>
