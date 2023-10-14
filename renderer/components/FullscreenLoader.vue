<template>
  <div class="fixed inset-0 h-screen w-screen">
    <div class="h-full w-full bg-black opacity-20" />
    <div
      class="absolute left-1/2 top-1/2 flex max-w-xs -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4"
    >
      <Spinner class="w-1/6" />
      <Typography v-if="message" is="span" variant="body">
        {{ message }}
      </Typography>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import Spinner from './Spinner.vue'
import Typography from './Typography.vue'
import { useFullscreenLoaderStore } from '../stores/fullscreen-loader'

const { message } = storeToRefs(useFullscreenLoaderStore())
</script>
