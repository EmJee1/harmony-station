<template>
  <component ref="contextMenuRef" :is="is">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type Component } from 'vue'
import type { ContextMenuRequest } from '../../types/context-menu'

const props = defineProps<{
  is: string | Component
  contextMenuArg: ContextMenuRequest
}>()

const contextMenuRef = ref<HTMLElement>()

function onContextMenu() {
  window.electronAPI.spawnContextMenu({
    version: props.contextMenuArg.version,
    track: props.contextMenuArg.track,
  })
}

onMounted(() => {
  contextMenuRef.value!.addEventListener('contextmenu', onContextMenu)
})

onBeforeUnmount(() => {
  contextMenuRef.value!.removeEventListener('contextmenu', onContextMenu)
})
</script>
