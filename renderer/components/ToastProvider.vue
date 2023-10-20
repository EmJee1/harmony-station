<template>
  <div class="fixed bottom-20 right-6 z-20">
    <TransitionGroup name="list" tag="div" class="space-y-4">
      <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import ExclamationCircleIcon from '@heroicons/vue/24/outline/ExclamationCircleIcon'
import { storeToRefs } from 'pinia'
import Typography from './Typography.vue'
import { useToastStore } from '../stores/toast-store'
import Toast from './Toast.vue'

const { toasts } = storeToRefs(useToastStore())
</script>
