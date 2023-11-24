<template>
  <div
    class="rounded p-4"
    :class="{
      'bg-yellow-200 text-yellow-800': severity === 'warning',
      'bg-red-200 text-red-600': severity === 'error',
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
