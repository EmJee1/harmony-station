<template>
  <component ref="contextMenuRef" :is="is">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { onUnmounted, onMounted, ref, type Component } from 'vue'

const props = defineProps<{
  is: string | Component
  version: 'track' | 'queue-item'
}>()

const contextMenuRef = ref<HTMLElement>()

function onContextMenu() {
  window.electronAPI.spawnContextMenu(props.version)
}

onMounted(() => {
  contextMenuRef.value!.addEventListener('contextmenu', onContextMenu)
})

onUnmounted(() => {
  contextMenuRef.value!.removeEventListener('contextmenu', onContextMenu)
})
</script>
