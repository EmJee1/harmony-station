<template>
  <div
    class="rounded p-4 shadow-sm"
    :class="{
      'bg-yellow-200 text-yellow-800 shadow-yellow-200': severity === 'warning',
      'bg-red-200 text-red-800 shadow-red-200': severity === 'error',
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  severity: 'warning' | 'error'
}>()
</script>
