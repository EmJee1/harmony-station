<template>
  <div class="fixed bottom-20 right-6 z-20">
    <TransitionGroup name="list" tag="div" class="space-y-4">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex w-80 gap-4 rounded bg-red-600 px-6 py-4 text-white"
      >
        <ExclamationCircleIcon class="h-8 w-8" />
        <Typography is="p" variant="body">
          {{ toast.message }}
        </Typography>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import ExclamationCircleIcon from '@heroicons/vue/24/outline/ExclamationCircleIcon'
import { storeToRefs } from 'pinia'
import Typography from './Typography.vue'
import { useToastStore } from '../stores/toast-store'

const { toasts } = storeToRefs(useToastStore())
</script>
