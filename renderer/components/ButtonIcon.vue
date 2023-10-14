<template>
  <component
    :is="is"
    class="h-6 w-6 rounded-full"
    :class="{ 'cursor-not-allowed opacity-40': disabled }"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    is?: 'button' | 'RouterLink'
    disabled?: boolean
  }>(),
  { is: 'button' }
)
</script>
