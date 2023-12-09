<template>
  <div class="mt-6 space-y-4">
    <Typography is="h2" variant="heading-3" weight="medium">
      {{ title }}
    </Typography>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Typography from './Typography.vue'

defineProps<{
  title: string
}>()
</script>
