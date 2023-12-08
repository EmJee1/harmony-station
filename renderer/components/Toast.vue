<template>
  <div
    class="flex w-80 items-center gap-4 rounded px-6 py-4 text-white"
    :class="{
      'bg-green-600': toast.variant === 'success',
      'bg-blue-600': toast.variant === 'info',
      'bg-red-600': toast.variant === 'error',
    }"
  >
    <div>
      <CheckCircleIcon v-if="toast.variant === 'success'" class="w-8" />
      <InformationCircleIcon v-else-if="toast.variant === 'info'" class="w-8" />
      <ExclamationCircleIcon
        v-else-if="toast.variant === 'error'"
        class="w-8"
      />
    </div>
    <Typography is="p" variant="body" class="w-full max-w-full break-words">
      {{ toast.message }}
    </Typography>
  </div>
</template>

<script setup lang="ts">
import CheckCircleIcon from '@heroicons/vue/24/outline/CheckCircleIcon'
import InformationCircleIcon from '@heroicons/vue/24/outline/InformationCircleIcon'
import ExclamationCircleIcon from '@heroicons/vue/24/outline/ExclamationCircleIcon'
import Typography from './Typography.vue'
import type { Toast } from '../stores/toast-store'

defineProps<{
  toast: Toast
}>()
</script>
