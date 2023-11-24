<template>
  We could not read the
  <Typography is="span" variant="body" weight="light">
    {{ error.meta.path }}
  </Typography>
  directory. Are you sure the device is connected and accessible?
</template>

<script setup lang="ts">
import Typography from '../Typography.vue'
import type { DirNotVisibleHealthError } from '../../../types/health'

defineProps<{
  error: DirNotVisibleHealthError
}>()
</script>
