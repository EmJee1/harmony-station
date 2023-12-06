<template>
  <div class="flex justify-between">
    <Typography is="span" variant="body" weight="bold">
      Directory not readable:
      <Typography is="span" variant="body" weight="light">
        {{ error.meta.path }}
      </Typography>
    </Typography>
    <Link to="/settings" @click="emit('close')">
      Edit audio directories
      <ArrowRightIcon class="inline w-4" />
    </Link>
  </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@heroicons/vue/24/outline/ArrowRightIcon'
import Link from '../Link.vue'
import Typography from '../Typography.vue'
import type { DirNotVisibleHealthError } from '../../../types/health'

defineProps<{
  error: DirNotVisibleHealthError
}>()

const emit = defineEmits<(e: 'close') => void>()
</script>
