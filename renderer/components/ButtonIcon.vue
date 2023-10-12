<template>
  <button
    class="h-6 w-6 rounded-full"
    :class="{ 'cursor-not-allowed opacity-40': disabled }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  disabled?: boolean
}>()
</script>
