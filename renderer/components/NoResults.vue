<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <CubeTransparentIcon class="h-12 w-12" />
    <Typography is="p" variant="heading-3">{{ title }}</Typography>
  </div>
</template>

<script setup lang="ts">
import CubeTransparentIcon from '@heroicons/vue/24/outline/CubeTransparentIcon'
import Typography from './Typography.vue'

defineProps<{
  title: string
}>()
</script>
